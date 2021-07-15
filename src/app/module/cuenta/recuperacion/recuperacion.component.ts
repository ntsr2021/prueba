import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../shared/service/user.service';

import * as alertify from 'alertifyjs';
declare var $:any;

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.css']
})
export class RecuperacionComponent implements OnInit {

	correo = null;
  espera = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  recuperar()
  {
  	$('#recuperar-form').validate({
  	  rules: {
  	    correo: { required:true, correo:true },
  	  },
  	  messages: {
  	    correo: { required:'Campo requerido', correo:'Formato incorrecto' }
  	  },

  	  submitHandler: ()=> 
  	  {
		  	this.userService.recuperar(this.correo).subscribe(resp =>
		  	{
		  		let mens = resp['mens'];

		  		if(mens == 'envio')
		  			alertify.alert('Alerta', 'Ha ocurrido un error al enviar la nueva contraseña a tu correo electrónico, intenta de nuevo');
		  		else if(mens == 'correo')
		  			alertify.alert('Alerta', 'El correo electrónico ingresado no corresponde con ninguna cuenta de usuario');
		  		else
		  			alertify.alert('Alerta', 'Tu nueva contraseña ha sido enviada al correo electrónico: '+this.correo + 
                                    ' (Ten en cuenta que el correo enviado podría alojarse en la bandeja de spam)');
		  	})
		  }
		})
  }

}
