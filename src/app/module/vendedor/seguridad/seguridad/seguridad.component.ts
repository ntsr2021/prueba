import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../../shared/service/user.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {

  espera = false;

	password = {
		password_actual: null,
		password_nuevo: null,
		id_user: null
	}

	jwt = {
	  token: window.localStorage.getItem('token')
	}
	user = null;


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  cambiar()
  {
  	$('#adm-seguridad-form').validate({
  	  rules : {
  	    password_actual: { required:true, minlength:6, maxlength:20 },
  	    adm_password_nuevo: { required:true, clave:true },
  	    password_nuevo2: { required:true, equalTo:'#adm_password_nuevo' }
  	  },
  	  messages: {
  	    password_actual: { required: 'Campo requerido', minlength: 'Mínimo 6 caracteres', maxlength: 'Máximo 20 caracteres' },
  	    adm_password_nuevo: { required: 'Campo requerido' },
        password_nuevo2: { required: 'Campo requerido', equalTo:'La contraseña no coincide' }
  	  },


  	  submitHandler: ()=> 
  	  {
        this.espera = true;

      	this.userService.consultar(this.jwt).subscribe(resp => 
      	{
      	  this.user = resp;
      	  this.password.id_user = this.user.id_user;

      	  this.userService.seguridad(this.password).subscribe(resp =>
      	  {
            this.espera = false;

      	    if(resp['mens'] != null)
            {
              localStorage.setItem('token', resp['mens']);

      	    	alertify.alert('Alerta', 'Contraseña cambiada exitosamente');

              this.reset();
            }
            else
              alertify.alert('Alerta', 'La contraseña anterior no corresponde con tu cuenta de usuario');
      	  })
      	})
      }
    })
  }

  reset()
  {
    $("form select").each(function() { this.selectedIndex = 0 });
    $("form input, form textarea").each(function() { this.value = '' });
  }  
  
}
