import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ClienteService } from '../../../../shared/service/cliente.service';
import { UserService } from '../../../../shared/service/user.service';

import * as alertify from 'alertifyjs';
declare var $:any;

  
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent implements OnInit 
{

	cliente={
    id_user: null,
	  tipo_doc : 'v',
	  doc : null,
	  nombre : '',
	  apellido : '',
	  telefono : null,
    correo: null,
    direccion: ''
	};
	espera = false;

  jwt = {
    token: window.localStorage.getItem('tokenCliente')
  }
  user = null;


  constructor(private router : Router,
  						private clienteService: ClienteService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.consultar();
  }


  consultar() 
  {
    this.userService.consultar(this.jwt).subscribe(resp => 
    {
      this.user = resp;
      this.cliente.id_user = this.user.id_user;

      this.clienteService.consUno(this.user.id_user).subscribe(resp =>
      {
        this.cliente.tipo_doc = resp['tipo_doc'];
        this.cliente.doc = resp['doc'];
        this.cliente.nombre = resp['nombre'];
        this.cliente.apellido = resp['apellido'];
        this.cliente.telefono = resp['telefono'];
        this.cliente.correo = resp['correo'];
        this.cliente.direccion = resp['direccion'];
      })
    })
  }

  editar()
  {  
    $('#cli-datos-form').validate({
      rules : {
        doc: { required:true, digits:true, minlength:5, maxlength:11 },
        nombre: { required:true, alfanumerico:true, maxlength:40 },
        apellido: { required:true, alfanumerico:true, maxlength:40 },
        telefono: { required:true, telefono:true },
        direccion:{ required:true, descripcion:true,maxlength:300 }
      },
      messages: {
        doc: { required:'Campo requerido', digits:'Solo numeros', minlength:'Minimo 5 digitos', maxlength:'Maximo 11 digitos' },
        nombre: { required:'Campo requerido', maxlength:'Maximo 40 caracteres' },
        apellido: { required:'Campo requerido', maxlength:'Maximo 40 caracteres' },
        telefono: { required: 'Campo requerido', telefono:'Formato incorrecto' },
        direccion: { required: 'Campo requerido', maxlength: 'Maximo 300 caracteres' }
      },


      submitHandler: ()=> 
      {
        this.espera = true;

        this.clienteService.editar(this.cliente).subscribe(resp => 
        {
          this.espera = false;
          let mens = resp['mens'];


          if(mens == 'documento')
            alertify.alert('Alerta', 'El número de documento ingresado ya se encuentra registrado por otro usuario')
          else if(mens == 'telefono')
            alertify.alert('Alerta', 'El número de teléfono ingresado ya se encuentra registrado por otro usuario');
          else 
            alertify.alert('Alerta', 'Datos editados exitosamente!!!'); // Edicion exitosa
        })
      }
    })
  }

}
