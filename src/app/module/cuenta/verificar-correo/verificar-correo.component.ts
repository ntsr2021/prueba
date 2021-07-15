import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var $:any;
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-verificar-correo',
  templateUrl: './verificar-correo.component.html',
  styleUrls: ['./verificar-correo.component.css']
})
export class VerificarCorreoComponent implements OnInit {

  codigo = null;
	@Output() registroEvent = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }


  verificar()
  {
  	$('#verificacion-codigo-form').validate({
  		rules : {
  			codigo: { required:true, digits:true, maxlength:6 }
  		},
  		messages: {
  		  codigo: { required:'Campo requerido', digits:'Solo números', maxlength:'Mínimo 6 dígitos' }
  		},

  		submitHandler: ()=> { 

        this.registroEvent.emit(this.codigo) 
      }
  		
  	})
  }

}
