import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BannerMarcaService } from '../../../../../../shared/service/banner-marca.service';
import { ArchivoService } from '../../../../../../shared/service/archivo.service';
import { DepartamentoGrupoService } from '../../../../../../shared/service/departamento-grupo.service';
import { DepartamentoService } from '../../../../../../shared/service/departamento.service';

declare var $:any;
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

	@Output() getRegistroEvent = new EventEmitter();

	grupo1 = null;
	grupo2 = null;
	grupo3 = null;
	departamentos1 = null;
	departamentos2 = null;
	departamentos3 = null;


	marca = {
	  foto: null,
	  departamento1: null,
	  departamento2: null,
	  departamento3: null,

	  fotoTemp: ''
	};

	displayIcon = 'inline';
  displayImg = 'none';
	archivo = {
    nombre: null,
    base64: null
  }

  trasladarModal = false;


  constructor(private bannerMarcaService: BannerMarcaService,
							private archivoService: ArchivoService,
							private departamentoGrupoService: DepartamentoGrupoService,
							private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
  	this.consDepartamento1();
  }


  abrirModal() {

    if(this.trasladarModal == false) 
      /* 
      Se trastalada modal #marca-agregar-modal dentro del elemento #marca-agregar-content para poder mostrarlo correctamente,
      debido a q el modal en su posicion actual esta en un nivel muy inferior en el doom lo q impide su correcto funcionamiento.
      */
    {
      $('#marca-agregar-content').html($('#marca-agregar-modal'));
      this.trasladarModal = true;
    }


    $('#marca-agregar-modal').modal('show');
  }



  // Gestionar foto
  eliminarFoto()
  {
    this.displayImg = 'none';
    this.displayIcon = 'inline';
  }

  clicFile(){ $('[name="foto_marca"]').click() }

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
        this.marca.fotoTemp = 'assets/img/temp/' + this.archivo.nombre;

        this.displayIcon = 'none';
        this.displayImg = 'inline';
      }
    })
  }


  // Seleccionar departamento
  consDepartamento1()
  {
  	this.departamentoGrupoService.consPrimero().subscribe(resp => 
  	{
  		this.grupo1 = resp;

  		this.departamentoService.consTodos(this.grupo1.id_departamento_grupo).subscribe(resp => {
  			this.departamentos1 = resp;	
  		})
  	})
  }

  consDepartamento2()
  {
  	if(this.marca.departamento1 == null || this.marca.departamento1 == '')
  	{
  		this.grupo2 = null;
  		this.grupo3 = null;
  		this.departamentos2 = null;
  		this.departamentos3 = null;
  		this.marca.departamento2 = null;
  		this.marca.departamento3 = null;
  	}
  	else 
  	{
  		let id_grupo_apunta = this.obtIdGrupo(this.departamentos1, this.marca.departamento1);

  		if(id_grupo_apunta != null)
  		{
  			this.departamentoGrupoService.consUno(id_grupo_apunta).subscribe(resp => 
  			{
  				this.grupo2 = resp;

  				this.departamentoService.consTodos(this.grupo2.id_departamento_grupo).subscribe(resp => {
  					this.departamentos2 = resp;	
  				})
  			})
  		}
  	}
  }

  consDepartamento3()
  {
  	if(this.marca.departamento2 == null || this.marca.departamento2 == '')
  	{
  		this.grupo3 = null;
  		this.departamentos3 = null;
  		this.marca.departamento3 = null;
  	}
  	else 
  	{
  		let id_grupo_apunta = this.obtIdGrupo(this.departamentos2, this.marca.departamento2);

  		if(id_grupo_apunta != null)
  		{
  			this.departamentoGrupoService.consUno(id_grupo_apunta).subscribe(resp => 
  			{
  				this.grupo3 = resp;

  				this.departamentoService.consTodos(this.grupo3.id_departamento_grupo).subscribe(resp => {
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
  ////////////////////////////////////////////




  // Guardar marca
  agregar()
  {
    $('#banner-marca-form').validate({
      rules : {
        departamento1: { required:true }
      },
      messages: {
        departamento1: { required:'Campo requerido' }
      },

      submitHandler: ()=> 
      {
    		if(this.displayImg != 'none') // Registrar marca
    		{
    			this.marca.foto = this.archivo;

    			this.bannerMarcaService.agregar(this.marca).subscribe(resp =>
    			{
    				if(resp['mens']=='OK') 
    	      {
    	        $('#marca-agregar-modal').modal('hide');
    	        alertify.success('Marca agregada');
    	        
    	        this.getRegistroEvent.emit(true);

              setTimeout(()=> this.reset(), 300);
    	        
    	      }else 
    	        alertify.error('Ejecución fallida');
    			});
    		}else // No se puede registrar sin foto
    			alertify.alert('Alerta', 'No es posible agregar una marca sin su foto correspondiente');
      }
    })
	}


	// Resetear campos
	reset()
	{
		this.marca.foto = null;
		this.marca.departamento1 = null;
		this.marca.departamento2 = null;
		this.marca.departamento3 = null;
		this.marca.fotoTemp = '';

    this.grupo2 = null;
    this.grupo3 = null;

    this.displayImg = 'none';
    this.displayIcon = 'inline';
	}

}