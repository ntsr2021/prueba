import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { VendedorService } from '../../../../../../shared/service/vendedor.service';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

	@Output() vendedorEditadoEvent = new EventEmitter();
	
	vendedor = {
    id_user: null,
    ci: null,
    nombre : null,
    apellido: null,
    cargo: null,
    username: null,
    password: null
  }


  constructor(private vendedorService: VendedorService) { }

  ngOnInit(): void {
  }


  consUno(id_user) 
  {
	  this.vendedorService.consUno(id_user).subscribe(resp => 
	  {
	    if(resp != null)
	    {
	    	this.vendedor.id_user = resp['id_user'];
        this.vendedor.ci = resp['ci'];
        this.vendedor.nombre = resp['nombre'];
	    	this.vendedor.apellido = resp['apellido'];
        this.vendedor.cargo = resp['rol'];
        this.vendedor.username = resp['username'];



	    	setTimeout(()=> $('#vendedor-editar-modal').modal('show'), 300)
	    }
	  })
  }


  editar()
  {
  	$('#vendedor-editar-form').validate({
  		rules : {
        nombre: { required:true, maxlength:25, letras:true },
        apellido: { required:true, maxlength:25, letras:true },
        ci: { required:true, digits:true, minlength:7, maxlength:8 },
        cargo: { required:true },
        password_nuevo: { required:true, minlength:6, maxlength:20 },
        password_nuevo2: { required:true, equalTo:'#password_nuevo' }
      },
      messages: {
        nombre: { required:'Campo requerido', maxlength: 'Máximo 25 caracteres' },
        apellido: { required:'Campo requerido', maxlength: 'Máximo 25 caracteres' },
        ci: { required:'Campo requerido', digits:'Solo numeros', minlength:'Minimo 7 digitos', maxlength:'Maximo 8 digitos' },
        cargo: { required:'Campo requerido' },
        password_nuevo: { required:'Campo requerido', minlength:'Mínimo 6 caracteres', maxlength:'Máximo 20 caracteres' },
        password_nuevo2: { required:'Campo requerido', equalTo:'Las contraseñas no coinciden' }
      },


  		submitHandler: ()=> 
  		{
  		  this.vendedorService.editar(this.vendedor).subscribe(resp => 
  		  {
  		    if(resp['mens'] == 'OK')
  		    {
            $('#vendedor-editar-modal').modal('hide');
  		      alertify.success('Vendedor editado exitosamente');
  		      this.vendedorEditadoEvent.emit(true)
  		    }
  		  })
  		}
  	})
  }


  // Activar cambio de contrasena
  activarCambContrasena() 
  {
    if($('#contrasena-activar').prop('checked') == true)
    {
      $('#password_nuevo').prop('disabled', false);
      $('#password_nuevo2').prop('disabled', false);
    }
    else 
    {
      this.vendedor.password = null;
      $('#password_nuevo').prop('disabled', true);
      $('#password_nuevo2').prop('disabled', true);
    }
  }

}
