import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BannerMarcaService } from '../../../../../../shared/service/banner-marca.service';
import { ArchivoService } from '../../../../../../shared/service/archivo.service';
import { DepartamentoGrupoService } from '../../../../../../shared/service/departamento-grupo.service';
import { DepartamentoService } from '../../../../../../shared/service/departamento.service';

declare var $:any;
import * as alertify from 'alertifyjs';

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


	marca = {
		id_banner_marca: null,
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

  primeraConsulta = false;


  constructor(private bannerMarcaService: BannerMarcaService,
							private archivoService: ArchivoService,
							private departamentoGrupoService: DepartamentoGrupoService,
							private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
  }



  // Gestionar foto
  eliminarFoto()
  {
    this.displayImg = 'none';
    this.displayIcon = 'inline';
  }

  clicFile(){ $('[name="config_foto_marca2"]').click() }

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

  			this.consDepartamento2();
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

  					this.consDepartamento3();
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




  // Editar marca
  editar()
  {
    $('#config-marca-editar-form').validate({
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
    			if(this.archivo.nombre == null)
    				this.archivo.nombre = this.marca.foto;

    			this.marca.foto = this.archivo;


    			this.bannerMarcaService.editar(this.marca).subscribe(resp =>
    			{
    				if(resp['mens']=='OK') 
    	      {
    	        $('#config-marca-editar-modal').modal('hide');
    	        alertify.success('Marca editada');
    	        
    	        this.getEdicionEvent.emit(true);

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
	}


	// Consultar datos de la marca seleccionada
	consUno(id)
	{	
		this.bannerMarcaService.consUno(id).subscribe(resp => 
		{
		  this.marca.id_banner_marca = id;
		  this.marca.foto = resp['foto'];
		  this.marca.departamento1 = resp['id_departamento1'];
		  this.marca.departamento2 = resp['id_departamento2'];
		  this.marca.departamento3 = resp['id_departamento3'];


		  this.grupo1 = null;
		  this.grupo2 = null;


		  this.consulFoto();
		  this.consDepartamento1();


		  // Trasladar modal de la marca a un nivel arriba en el DOOM para poder mostrarlo
		  setTimeout(()=> 
	  	{
	  		if(this.primeraConsulta == false)
	  		{
	  			$('#config-marca-modal-content').html($('#config-marca-editar-modal'));
	  			this.primeraConsulta = true;
	  		}
	  		

	  		// Completar selec de departamentos en el formulario
	  		let formMarca = $('#config-marca-editar-form');
	  		formMarca.find('[name="departamento1"]').val(this.marca.departamento1);
	  		if(formMarca.find('[name="departamento2"]').length > 0)
	  			formMarca.find('[name="departamento2"]').val(this.marca.departamento2);
	  		if(formMarca.find('[name="departamento3"]').length > 0)
	  			formMarca.find('[name="departamento3"]').val(this.marca.departamento3);


	  		$('#config-marca-editar-modal').modal('show');
	  	}, 300)

		});
	}


	// Consultar foto de la marca 
	consulFoto()
	{
    this.marca.fotoTemp = 'assets/img/banner/marca/' + this.marca.foto;
    this.displayIcon = 'none';
    this.displayImg = 'inline';
	}


	// SELECCIONAR DEPARTAMENTOS 
	selecDep1()
	{
		this.marca.departamento2 = null;
		this.grupo2 = null;
		this.marca.departamento3 = null;
		this.grupo3 = null;

		this.consDepartamento2();
	}

	selecDep2()
	{
		this.marca.departamento3 = null;
		this.grupo3 = null;

		this.consDepartamento3();
	}

}


