import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProductoService } from '../../../../../shared/service/producto.service';
import { ArchivoService } from '../../../../../shared/service/archivo.service';
import { DepartamentoGrupoService } from '../../../../../shared/service/departamento-grupo.service';
import { DepartamentoService } from '../../../../../shared/service/departamento.service';

import { FormatoMoneda } from '../../../../../shared/helper/formato-moneda';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

	@Output() getRegistroEvent = new EventEmitter();

	grupo1 = null;
	grupo2 = null;
	grupo3 = null;
	departamentos1 = null;
	departamentos2 = null;
	departamentos3 = null;


	producto = {
	  id_producto: null,
	  estatus: null,
	  fotoTemp: '',
	  foto: null,
	  codigo: null,
	  nombre: null,
	  descripcion: null,
	  cantidad: null,
	  precio: null,
    precioFormato: '',
    posee_iva: false,

	  departamento1: null,
	  departamento2: null,
	  departamento3: null
	};

	displayIcon = 'inline';
  displayImg = 'none';
	archivo = {
    nombre: null,
    base64: null
  }

	
  constructor(private productoService: ProductoService,
							private archivoService: ArchivoService,
							private departamentoGrupoService: DepartamentoGrupoService,
							private departamentoService: DepartamentoService,
              public formatoMoneda: FormatoMoneda) { }


  ngOnInit(): void {
  	this.consDepartamento1();

		this.script();
  }

  
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

  


  reset() {
	  $("#producto-agregar-modal select").each(function() { this.selectedIndex = 0 });
	  $("#producto-agregar-modal input, #producto-agregar-modal textarea").each(function() { this.value = '' });

	  this.displayImg = 'none';
	  this.displayIcon = 'inline';
	}

	agregar()
	{
		if(this.displayImg == 'none' && this.producto.estatus != 'nv')
			alertify.alert('Alerta', `No es posible registrar el producto con estatus "En promoción" o "Normal" si no posee una foto. 
									Para registrar el producto sin una foto debe cambiar el estatus del mismo a "Inactivo"`);

    else if(this.producto.departamento1 == null || this.producto.departamento1 == 'null')
      alertify.alert('Alerta', `No es posible editar el producto si no indica por lo menos un departamento al que pertenece`);
    
		else 
		{
      $('#producto-form-reg').validate({
        rules : {
          codigo: { required:true, descripcion:true, maxlength:20 },
          departamento1: { required:true },
          nombre: { required:true, maxlength:100 },
          cantidad: { required:true, entero:true, maxlength: 6 },
          precio:{ required:true },
          descripcion:{ required:true, maxlength:2000 }
        },
        messages: {
          codigo: { required:'Campo requerido', maxlength:'Máximo 20 caracteres' },
          departamento1: { required:'Campo requerido' },
          nombre: { required:'Campo requerido', maxlength:'Máximo 100 caracteres' },
          cantidad: { required:'Campo requerido', maxlength: 'Máximo 6 caracteres' },
          precio:{ required:'Campo requerido' },
          descripcion:{ required:'Campo requerido', maxlength: 'Máximo 2000 caracteres' }
        },

        submitHandler: ()=> 
        {
    			if(this.displayImg != 'none')
    				this.producto.foto = this.archivo;
    			else 
    				this.producto.foto = null;	

          this.producto.precio = this.formatoMoneda.limpiar(this.producto.precioFormato);


    			this.productoService.registrar(this.producto).subscribe(resp =>
    			{
    				if(resp['mens']=='OK') 
    	      {
    	        $('#producto-agregar-modal').modal('hide');
    	        alertify.success('Producto agregado');
    	        
    	        this.getRegistroEvent.emit(true);
    	        this.reset();
    	      }else 
    	        alertify.error('Ejecución fallida');
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
  }

  clicFile(){ $('[name="foto"]').click() }

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
      }
    })
  }
  /////////////////////


  // Activar IVA
  activarIVA()
  {
    let e = $('#posee_iva');
    let activar = e.prop('checked');

    // Habilitar o desabilitar input % IVA
    if(activar == true) 
      $('#producto-form-reg [name="iva"]').prop('disabled', false);
    else 
    {
      $('#producto-form-reg [name="iva"]').prop('disabled', true);
    }
  }



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


  tipearMoneda()
  {
    this.producto.precioFormato = this.formatoMoneda.setFormato(this.producto.precioFormato);
  }

}	
