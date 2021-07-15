import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { VendedorService } from '../../../../../../shared/service/vendedor.service';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {


	@Output() vendedorAgregadoEvent = new EventEmitter();

  vendedor = {
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

  registrar()
  {
  	$('#vendedor-registrar-form').validate({
  		rules : {
  			nombre: { required:true, maxlength:25, letras:true },
        apellido: { required:true, maxlength:25, letras:true },
        ci: { required:true, minlength:7, maxlength:8 },
        cargo: { required: true },
        username: { required:true, maxlength:20, alfanumerico:true },
        ven_reg_password: { required:true, minlength:6, maxlength:20 },
        password2: { required:true, equalTo:'#ven_reg_password' }
  		},
  		messages: {
  		  nombre: { required:'Campo requerido', maxlength: 'Máximo 25 caracteres' },
        apellido: { required:'Campo requerido', maxlength: 'Máximo 25 caracteres' },
        ci: { required:'Campo requerido', minlength:'Mínimo 7 dígitos', maxlength:'Máximo 8 dígitos' },
        cargo: { required: 'Campo requerido' },
        username: { required:'Campo requerido', maxlength:'Máximo 20 caracteres' },
        ven_reg_password: { required:'Campo requerido', minlength:'Mínimo 6 caracteres', maxlength:'Máximo 20 caracteres' },
        password2: { required:'Campo requerido', equalTo:'Las contraseñas no coinciden' }
  		},


  		submitHandler: ()=> 
  		{
  		  this.vendedorService.registrar(this.vendedor).subscribe(resp => 
  		  {
  		    if(resp['mens'] == 'OK')
  		    {
            $('#vendedor-registrar-modal').modal('hide');
  		      alertify.success('Usuario agregado exitosamente');
  		      this.vendedorAgregadoEvent.emit(true);
  		    }
          else if(resp['mens'] == 'usuario')
            alertify.alert('Alerta', 'El nombre de usuario ingresado ya existe');
  		  })
  		}
  	})
  }

}	
