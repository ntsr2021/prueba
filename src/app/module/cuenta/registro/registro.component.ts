import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


import { ClienteService } from '../../../shared/service/cliente.service';

import { GlobalConstants } from '../../../config/global-constants';

import * as alertify from 'alertifyjs';
declare var $:any;



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit 
{


	cliente={
	  nombre : null,
	  apellido : null,
	  telefono : null,
    correo: null,
    contrasena: null,

    cod_enviado: null,
    cod_ingresado: null
	};
	espera = false;



  constructor(private router : Router,
  						private clienteService: ClienteService) { }



  ngOnInit(): void {
  }



  verificarDatos()
  {  
    $('#cue-registro-form').validate({
    	rules : {
    		nombre: { required:true, alfanumerico:true, maxlength:40 },
    		apellido: { required:true, alfanumerico:true, maxlength:40 },
    		telefono: { required:true, telefono:true },
    		correo:{ required:true, correo:true},
    		contrasena_reg: {required: true, descripcion:true},
    		contrasena2_reg: {required: true, equalTo:'#contrasena_reg'}
    	},
    	messages: {
    	  nombre: { required:'Campo requerido', maxlength:'Maximo 40 caracteres' },
    	  apellido: { required:'Campo requerido', maxlength:'Maximo 40 caracteres' },
    	  telefono: { required: 'Campo requerido', telefono:'Formato incorrecto' },
    	  correo: { required: 'Campo requerido', correo:'Formato incorrecto' },
    	  contrasena_reg: { required: 'Campo requerido' },
    	  contrasena2_reg: { required: 'Campo requerido', equalTo:'La contraseña no coincide' }
    	},


    	submitHandler: ()=> 
    	{

        let aceptarTerminos = $('#terminos-check').prop('checked');
        
        if(aceptarTerminos == true) // Si ya a aceptado los terminos y condiciones
        {
          this.espera = true;

          this.clienteService.verificarDatos(this.cliente).subscribe(resp => 
          {
            this.espera = false;
            let mens = resp['mens'];


            if(mens == 'correo_repetido')
              alertify.alert('Alerta', 'El correo electrónico ingresado ya se encuentra registrado');
            else if(mens == 'telefono')
              alertify.alert('Alerta', 'El numero de teléfono ingresado ya se encuentra registrado');
            else if(mens == 'envio')
              alertify.alert('Alerta', 'Ha ocurrido un error al verificar el correo electrónico');
            else // Recibe codigo de correo electrónico para verificarlo
            {
              window.localStorage.setItem('codigo', mens);


              $('#verificar-codigo-modal [name="codigo"]').val(''); // Vaciar campo codigo cada vez que se abre el modal
              $('#verificar-codigo-modal').modal({backdrop: 'static', keyboard: false})
            }
          })
        }

    	  else // Sino acepta los terminos y condiciones
        {
          alertify.alert('Alerta', 'Debe aceptar los Términos y Condiciones, y la Política de Privacidad para continuar');
        }
    	}
    })
  }

  registrar(codigo) // Este metodo es accionado desde la componente 
  {  
    this.cliente.cod_enviado = localStorage.getItem('codigo');
    this.cliente.cod_ingresado = codigo;


    $('#verificacion-codigo-form [type="submit"]').prop('disabled', true); // Desactivar btn submit


    this.clienteService.registrar(this.cliente).subscribe(resp => 
    {
      if(resp['mens'] == 'codigo')
      {
        alertify.alert('Alerta', 'El código ingresado es incorrecto');
        $('#verificacion-codigo-form [type="submit"]').prop('disabled', false); // Activar btn submit
      }
      else if(resp['mens'] != null)
      {
        let token: any = resp['mens'];
        window.localStorage.setItem('tokenCliente', token);


        $('#verificar-codigo-modal').modal('hide');
        setTimeout(()=> this.router.navigate(['']), 300);
        
        
        // setTimeout(()=> location.href = GlobalConstants.site, 100); 
        // Redirecciona luego de un milisegundo para dar tiempo a la creacion del token
        

      }
    })
  }

}

