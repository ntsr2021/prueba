import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';

import { UserService } from './../../../shared/service/user.service';

import { GlobalConstants } from '../../../config/global-constants';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user = {
    username: null,
    password: null
  }
  espera = false;
  contPenitencia = 0;
  intentos = 0;

  disabled = false;


  constructor(private router: Router,
              private userService: UserService) { }


  ngOnInit(): void {
  }


  acceder() 
  {
    $('#cue-login-form').validate({
      rules: {
        username: { required:true, correo:true },
        password: { required:true, descripcion:true, minlength:6, maxlength:20 }
      },
      messages: {
        username: { required:'Campo requerido', correo:'Formato incorrecto' },
        password: { required:'Campo requerido', minlength:'Mínimo 6 caracteres', maxlength:'Máximo 20 caracteres' }
      },

      submitHandler: ()=> 
      {
        this.espera = true;

        this.userService.accederCliente(this.user).subscribe(resp => 
        {
          if(resp['mens'] != null)
          {

            let token: any = resp['mens'];
            window.localStorage.setItem('tokenCliente', token);

            this.router.navigate(['']);

          }else 
          {
            this.user.password = null;
            alertify.alert('Alerta', 'Usuario o contraseña incorrecto');
            this.espera = false;
            
            ++this.intentos;

            if(this.intentos == 5)
            {
              ++this.contPenitencia;
              this.disabled = true;
              const repetir = setInterval(()=> 
              {
                ++this.contPenitencia;
                if(this.contPenitencia == 5)
                {
                  this.contPenitencia = 0;
                  this.disabled = false;
                  this.intentos = 0;
                  clearInterval(repetir);
                }
              }, 1000);
            }
          }
        })
      }
    });
  }

}
