import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProductoService } from '../../../../../shared/service/producto.service';
import { ProductoFotoService } from '../../../../../shared/service/producto-foto.service';
import { UserService } from '../../../../../shared/service/user.service';
import { ArchivoService } from '../../../../../shared/service/archivo.service';
import { DepartamentoGrupoService } from '../../../../../shared/service/departamento-grupo.service';
import { DepartamentoService } from '../../../../../shared/service/departamento.service';

import { FormatoMoneda } from '../../../../../shared/helper/formato-moneda';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {


  @Output() getEdicionEvent = new EventEmitter();

  grupo1 = null;
  grupo2 = null;
  grupo3 = null;
  departamentos1 = null;
  departamentos2 = null;
  departamentos3 = null;


  disabled = null; // Desabilita opciones para los vendedores
  user = null; // Desabilita opciones para los vendedores

  producto = {
    id_producto: null,
    codigo: null,
    estatus: null,
    fotoTemp: '',
    foto: null,
    nombre: null,
    descripcion: null,
    cantidad: null,
    precioFormato: null,
    precio: null,
    foto_prin: null,

    departamento1: null,
    departamento2: null,
    departamento3: null
  };

  displayIcon = 'none';
  displayImg = 'none';
  nuevaImg = false;
  archivo = {
    nombre: null,
    base64: null
  }

  jwt = {
    token: window.localStorage.getItem('token')
  }

  bandExpandirFoto = false;


  constructor(private productoService: ProductoService,
              private userService: UserService,
              private productoFotoService: ProductoFotoService,
              private archivoService: ArchivoService,
              private departamentoGrupoService: DepartamentoGrupoService,
              private departamentoService: DepartamentoService,
              public formatoMoneda: FormatoMoneda) { }


  ngOnInit(): void {

    this.consUser(); // Consulta user para conocer su rol y activar o desactivar campos de la edit del producto


  }


  consUser() 
  {
    this.userService.consultar(this.jwt).subscribe(resp => 
    {
      this.user = resp;

      // Permite desabilitar campos de edicion del producto si el rol del user no es admin.
      if(this.user.rol == 'a')
        this.disabled = false;
      else 
        this.disabled = true;
    })
  }


  consUno(id_producto)
  {
    this.productoService.consUno(id_producto).subscribe(res => 
    {
      this.producto.id_producto = id_producto;
      this.producto.estatus = res['estatus'];
      this.producto.departamento1 = res['id_departamento1'];
      this.producto.departamento2 = res['id_departamento2'];
      this.producto.departamento3 = res['id_departamento3'];
      this.producto.codigo = res['codigo'];
      this.producto.nombre = res['nombre'];
      this.producto.descripcion = res['descripcion'];
      this.producto.cantidad = res['cantidad'];
      this.producto.precioFormato = this.formatoMoneda.setFormato(parseFloat(res['precio']).toFixed(2));
      this.producto.foto_prin = res['foto_prin'];


      this.consFoto();
      this.consDepTodos();
    });
  }


  consFoto()
  {
    if(this.producto.foto_prin != '' && this.producto.foto_prin != null)
    {
      this.producto.fotoTemp = 'assets/img/producto/' + this.producto.foto_prin + '.jpg';
      this.displayIcon = 'none';
      this.displayImg = 'inline';

      if(!this.bandExpandirFoto)
      {
        this.script();
        this.bandExpandirFoto = true;
      }
    }
    else 
    { 
      this.displayImg = 'none';
      this.displayIcon = 'inline';
    }
  }


  consDepTodos()
  {  
    this.grupo1 = null;
    this.grupo2 = null;
    this.grupo3 = null;
    this.departamentos1 = null;
    this.departamentos2 = null;
    this.departamentos3 = null;


    this.departamentoGrupoService.consPrimero().subscribe(resp => // Consultar primer grupo
    {
      this.grupo1 = resp;


      this.departamentoService.consTodos(this.grupo1.id_departamento_grupo).subscribe(resp => // Consultar departamentos del primer grupo 
      {
        this.departamentos1 = resp;  


        if(this.producto.departamento1 != null) 
        {
          let grupo_apunta = this.obtIdGrupo(this.departamentos1, this.producto.departamento1); 

          if(grupo_apunta != null)
          {
            this.departamentoGrupoService.consUno(grupo_apunta).subscribe(resp => // Consultar segundo grupo
            {
              this.grupo2 = resp;


              this.departamentoService.consTodos(this.grupo2.id_departamento_grupo).subscribe(resp => 
              {
                this.departamentos2 = resp;


                if(this.producto.departamento2 != null)
                {
                  let grupo_apunta = this.obtIdGrupo(this.departamentos2, this.producto.departamento2);  

                  if(grupo_apunta != null)
                  {
                    this.departamentoGrupoService.consUno(grupo_apunta).subscribe(resp => // Consultar tercer grupo
                    {
                      this.grupo3 = resp;


                      this.departamentoService.consTodos(this.grupo3.id_departamento_grupo).subscribe(resp => // Consultar dep del tercer grupo
                      {
                        this.departamentos3 = resp;

                        setTimeout(()=> $('#producto-editar-modal').modal('show'), 300); // Abrir modal
                      })

                    })
                  }
                  else 
                  {
                    setTimeout(()=> $('#producto-editar-modal').modal('show'), 300); // Abrir modal
                  }
                }
                else 
                {
                  setTimeout(()=> $('#producto-editar-modal').modal('show'), 300); // Abrir modal
                }
              })

            })
          }
          else 
          {
            setTimeout(()=> $('#producto-editar-modal').modal('show'), 300); // Abrir modal
          }
          
        }
        else 
        {
          setTimeout(()=> $('#producto-editar-modal').modal('show'), 300); // Abrir modal
        }

      })
    })
  }


   
  selecDepartamento1()
  {
    this.grupo2 = null;
    this.grupo3 = null;
    this.departamentos2 = null;
    this.departamentos3 = null;
    this.producto.departamento2 = null;
    this.producto.departamento3 = null;


    if(this.producto.departamento1 != null)
    {
      let grupo_apunta = this.obtIdGrupo(this.departamentos1, this.producto.departamento1);


      if(grupo_apunta != null)
      {
        this.departamentoGrupoService.consUno(grupo_apunta).subscribe(resp => // Consultar segundo grupo
        {
          this.grupo2 = resp;

          this.departamentoService.consTodos(this.grupo2.id_departamento_grupo).subscribe(resp => 
          {
            this.departamentos2 = resp;
          })
        })
      }
    }
  }


  selecDepartamento2()
  {
    this.grupo3 = null;
    this.producto.departamento3 = null;


    if(this.producto.departamento2 != null)
    {
      let grupo_apunta = this.obtIdGrupo(this.departamentos2, this.producto.departamento2);


      if(grupo_apunta != null)
      {
        this.departamentoGrupoService.consUno(grupo_apunta).subscribe(resp => // Consultar tercer grupo
        {
          this.grupo3 = resp;

          this.departamentoService.consTodos(this.grupo3.id_departamento_grupo).subscribe(resp => 
          {
            this.departamentos3 = resp;
          })
        })
      }
    }
  }



  // Permite obtener id del departamento al que apunta
  obtIdGrupo(dep, id_departamento)
  {
    let id_grupo_apunta = null;

    dep.forEach(e => {
      if(e.id_departamento == id_departamento)
        id_grupo_apunta = e.id_grupo_apunta;
    })

    return id_grupo_apunta;
  }



  editar()
  {
    if(this.displayImg == 'none' && this.producto.estatus != 'nv') // Validar q el estatus del prod no sea 'a' o 'd' si no hay img
      alertify.alert('Alerta', `No es posible editar el producto con estatus "En promoción" o "Normal" si no posee una foto. 
                  Para registrar el producto sin una foto debe cambiar el estatus del mismo a "Inactivo"`);

    else if(this.producto.departamento1 == null || this.producto.departamento1 == 'null')
      alertify.alert('Alerta', `No es posible editar el producto si no indica por lo menos un departamento al que pertenece`);

    else 
    {
      $('#producto-form-edi').validate({
        rules : {
          codigo: { required:true, descripcion:true, maxlength:20 },
          departamento1: { required:true },
          nombre: { required:true, maxlength:100 },
          cantidad: { required:true, entero:true, maxlength: 6 },
          precio:{ required:true },
          descripcion:{ required:true, maxlength:2000 },
          estatus: { required:true }
        },
        messages: {
          codigo: { required:'Campo requerido', maxlength:'Máximo 20 caracteres' },
          departamento1: { required:'Campo requerido' },
          nombre: { required:'Campo requerido', maxlength:'Máximo 100 caracteres' },
          cantidad: { required:'Campo requerido', maxlength: 'Máximo 6 digistos' },
          precio:{ required:'Campo requerido' },
          descripcion:{ required:'Campo requerido', maxlength: 'Máximo 2000 caracteres' },
          estatus: { required:'Campo requerido' }
        },

        submitHandler: ()=> 
        {
          if(this.nuevaImg == true) 
          {
            this.producto.foto_prin = this.producto.codigo + '-1';
            this.producto.foto = this.archivo;
          }else 
            this.producto.foto = null;  
          

          this.producto.precio = this.formatoMoneda.limpiar(this.producto.precioFormato);

          this.productoService.editar(this.producto).subscribe(resp => 
          {

            if(resp['mens']=='OK') 
            {
              $('#producto-editar-modal').modal('hide');
              alertify.success('Edición exitosa');
              
              this.getEdicionEvent.emit(this.producto.id_producto);
              // location.reload();

            }else 
              alertify.error('Edición fallida');


            this.grupo2 = null;
            this.grupo3 = null;
          });
        }
      })
    }
  }


  // Gestionar foto 

  eliminarFoto()
  {
    this.displayImg = 'none';
    this.displayIcon = 'inline';
    this.nuevaImg = false;
    this.producto.foto_prin = null;
  }

  clicFile(){ $('[name="foto_editar"]').click() }

  seleccionarArchivo(event)
  {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombre = file.name;

    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64 = btoa(binaryString); // Pasa cadena a 64 bits

    this.subirArchivoTemp();
  }
  subirArchivoTemp()
  {
    this.archivoService.subirTemp(this.archivo).subscribe(resp =>
    {
      if(resp['mens'] == 'OK')
      {
        this.producto.fotoTemp = 'assets/img/temp/' + this.archivo.nombre;

        this.displayIcon = 'none';
        this.displayImg = 'inline';

        this.nuevaImg = true;
      }
    })
  }

  /////////////////////


  script()
  {
    let btn_close = `
      width: 35px;
      height: 35px;
      background: #000;
      border: 1px solid #fff;
      border-radius: 100%;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      padding-top: 2px;
      position: absolute;
      top: 30px;
      right: 30px;
      cursor: pointer;
    `;

    $(".imagen").click(function(e) {
        var enlaceImagen = e.target.src;
        var data = $(this).attr("data");
        var lightbox = '<div class="ligthbox" style="width: 45%;height: 70%;position: fixed;top: 110px;margin-left: 90px;background: rgba(0, 0, 0, .8);display: flex;justify-content: center;align-items: center;z-index:9000 !important">' +
            '<img src="' + enlaceImagen + '" alt="" id="zoom_mw" data-zoom-image="' + data + '" style="width:400px;height:400px">' +
            '<div class="btn-close" style="'+btn_close+'">X</div>' +
            '</div>';

        $("body").append(lightbox)
        $(".btn-close").click(function() {
            $(".ligthbox").remove();
        })
    })
  }


  // Establecer formato de moneda al escribir
  tipearMoneda()
  {
    this.producto.precioFormato = this.formatoMoneda.setFormato(this.producto.precioFormato);
  }
  

}



