import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';

import { UserService } from './../../../shared/service/user.service';

import * as alertify from 'alertifyjs';
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit 
{

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
    $('#login-form').validate({
      rules: {
        username: { required:true, alfanumerico:true, minlength:6, maxlength:20 },
        password: { required:true, clave:true }
      },
      messages: {
        username: { required:'Campo requerido', minlength:'Mínimo 6 caracteres', maxlength:'Máximo 20 caracteres' },
        password: { required:'Campo requerido' }
      },

      submitHandler: ()=> 
      {
        this.espera = true;

        this.userService.acceder(this.user).subscribe(resp => 
        {
          if(resp['mens'] != null)
          {
            if(resp['rol'] != 'c')
            {
              let token: any = resp['mens'];

              

              if(resp['rol'] == 'a')
              {
                window.localStorage.setItem('token', token);
                this.router.navigateByUrl('vendedor');
              }
              else if(resp['rol'] == 'm')
              {
                window.localStorage.setItem('tokenMultimax', token);
                this.router.navigateByUrl('multimax');
              }
              else 
              {
                window.localStorage.setItem('token', token);
                this.router.navigateByUrl('vendedor/recibo');
              }
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
                $('#ini-btn-acceder').prop('disabled', true);
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
                });
              }


            }
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


