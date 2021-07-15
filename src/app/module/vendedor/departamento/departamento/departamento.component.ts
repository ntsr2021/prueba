import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { DepartamentoService } from './../../../../shared/service/departamento.service';
import { DepartamentoGrupoService } from './../../../../shared/service/departamento-grupo.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit 
{


  @ViewChild(MatSort, {static: true}) sort: MatSort; 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;
  columnas = ['nombre', 'subir', 'bajar', 'editar', 'incluir', 'eliminar'];
  departamentos = null;


  grupo = null;
  nuevoGrupo = {
    nombre: null,
    id_departamento: null // id_departamento guardara el id del departamento que apuntara al nuevo grupo
  }
  camAux = { // Guardara los datos temporalmente del departamente al cual se le desea agregar un grupo
    nombre: null,
    id_grupo_pertenece: null
  }; 
  camino = new Array();

  

  constructor(private departamentoService: DepartamentoService,
              private departamentoGrupoService: DepartamentoGrupoService) { }



  ngOnInit(): void {
    this.consPrimerGrupo(); // Consultar primer grupo
  }


  // Consultar primer grupo 
  consPrimerGrupo()
  {
    this.departamentoGrupoService.consPrimero().subscribe(resp => {
      this.grupo = resp;

      this.consDepartamentos(this.grupo.id_departamento_grupo);
    })
  }


  // Filtrar consulta de departamentos
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 


  // Consultar departamentos
  consDepartamentos(id_departamento_grupo)
  {
    this.departamentoService.consTodos(id_departamento_grupo).subscribe(resp => 
    {
      this.departamentos = resp;

      this.dataSource = new MatTableDataSource(this.departamentos); 
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator; 
    });
  }


  // Eliminar departamento
  eliminarDepartamento(id_departamento)
  {
    alertify.confirm('Confirmar', '¿Estás seguro(a) que deseas eliminar este departamento?, esta acción eliminara todos los grupos y departamentos vinculados al mismo.',
    ()=> 
    {
      this.departamentoService.eliminar(id_departamento).subscribe(resp => 
      {
        if(resp['mens'] == 'OK') 
        {
          alertify.success('Departamento eliminado');
          this.consDepartamentos(this.grupo.id_departamento_grupo);
        }else 
          alertify.error('Ejecución fallida');
      });
    }, ()=>{});
  }
  


  // Editar grupo 
  editarGrupo()
  {
    $('#grupo-form').validate({
      rules : {
        nombre: { required:true, descripcion:true, maxlength:80 }
      },
      messages: {
        nombre: { required:'Campo requerido', maxlength:'Máximo 80 caracteres' }
      },


      submitHandler: ()=> 
      {
        this.departamentoGrupoService.editar(this.grupo).subscribe(resp => 
        {
          if(resp['mens'] == 'OK')
            alertify.success('Grupo editado');
          else
            alertify.error('Ha ocurrido un error, intenta de nuevo');
        });
      }
    })
  }


  // Eliminar grupo
  eliminarGrupo() 
  {
    if(this.camino.length == 0) // No eliminar grupo xq es el primero
      alertify.alert('Alerta', 'No es posible eliminar el primer grupo');
    else 
    {
      alertify.confirm('Confirmar', `¿Estás seguro(a) que deseas eliminar este grupo?, esta acción eliminara todos los departamentos y grupos vinculados al mismo.`,
      ()=> {
        this.departamentoGrupoService.eliminar(this.grupo.id_departamento_grupo).subscribe(resp => 
        {
          if(resp['mens'] == 'OK') 
          {
            alertify.success('Grupo eliminado');
            this.volver();
          }else 
            alertify.error('Ejecución fallida');
        });
      }, ()=>{});
    }
  }
   

  // Incluir departamento
  incluir(dep)
  {
    if(this.camino.length < 2)
    {
      if(dep.id_grupo_apunta == null) // Agregar grupo
      {
        this.camAux.nombre = dep.nombre;
        this.camAux.id_grupo_pertenece = dep.id_grupo_pertenece;

        this.nuevoGrupo.id_departamento = dep.id_departamento;


        this.nuevoGrupo.nombre = null; // Vaciar input para agregar nuevo grupo
        $('#grupo-agregar-modal').modal('show');
      }

      else // Consultar departamentos del grupo 
      {
        this.departamentoGrupoService.consPorDepartamento(dep.id_grupo_apunta).subscribe(resp => 
        {
          this.grupo = resp;

          this.camino.push({
            nombre: dep.nombre,
            id_grupo_pertenece: dep.id_grupo_pertenece
          });

          this.consDepartamentos(this.grupo.id_departamento_grupo);
        })
      }
    }else // Solo incluir 2 subcategorias a un departamento
      alertify.alert('Alerta', 'Solo se permiten incluir 2 subcategorías a un departamento')
  }


  // Volver al grupo anterior
  volver()
  {
    this.departamentoGrupoService.consUno(this.camino[this.camino.length-1].id_grupo_pertenece).subscribe(resp => 
    {
      this.grupo = resp;

      this.consDepartamentos(this.grupo.id_departamento_grupo);

      this.camino.splice(this.camino.length-1, 1); 
    })
    
  }


  // Agregar grupo
  agregarGrupo()
  {
    $('#grupo-agregar-form').validate({
      rules : {
        nombre: { required:true, descripcion:true, maxlength:80 }
      },
      messages: {
        nombre: { required:'Campo requerido', maxlength:'Máximo 80 caracteres' }
      },


      submitHandler: ()=> 
      {
        this.departamentoGrupoService.agregar(this.nuevoGrupo).subscribe(resp => 
        {
          if(resp['mens'] == 'OK')
          {
            $('#grupo-agregar-modal').modal('hide');
            alertify.success('Grupo agregado exitosamente');
            
            this.grupo = resp['grupo'];


            this.camino.push({
		          nombre: this.camAux.nombre,
              id_grupo_pertenece: this.camAux.id_grupo_pertenece
		        });


            this.consDepartamentos(this.grupo.id_departamento_grupo);
            
          }else 
            alertify.alert('Alerta', 'Ejecución fallida');
        })
      }
    })
  }


  // Subir departamento 
  subir(id_departamento)
  {
    this.departamentoService.subir(id_departamento).subscribe(resp => 
    {
      if(resp['mens'] == 'OK')
        this.consDepartamentos(this.grupo.id_departamento_grupo);
      else 
        alertify.alert('Alerta', 'No es posible subir más el departamento');
    })
  }


  // Bajar departamento 
  bajar(id_departamento)
  {
    this.departamentoService.bajar(id_departamento).subscribe(resp => 
    {
      if(resp['mens'] == 'OK')
        this.consDepartamentos(this.grupo.id_departamento_grupo);
      else 
        alertify.alert('Alerta', 'No es posible bajar más el departamento');
    })
  }

}

