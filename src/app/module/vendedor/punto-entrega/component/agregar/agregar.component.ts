import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PuntoEntregaService } from '../../../../../shared/service/punto-entrega.service';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {


	@Output() puntoAgregadoEvent = new EventEmitter();

  punto_entrega = {
    nombre: null,
    direccion: null
  }

	
  constructor(private puntoEntregaService: PuntoEntregaService) { }

  ngOnInit(): void {
  }

  agregar()
  {
  	$('#punto-entrega-agregar-form').validate({
  		rules : {
        nombre: { required:true, maxlength:50 },
  			direccion: { required:true, maxlength:300 }
  		},
  		messages: {
        nombre: { required:'Campo requerido', maxlength:'Máximo 50 caracteres' },
  		  direccion: { required:'Campo requerido', maxlength:'Máximo 300 caracteres' }
  		},


  		submitHandler: ()=> 
  		{
  		  this.puntoEntregaService.agregar(this.punto_entrega).subscribe(resp => 
  		  {
  		    if(resp['mens'] == 'OK')
  		    {
            $('#punto-entrega-agregar-modal').modal('hide');
  		      alertify.success('Punto de entrega agregado exitosamente');
  		      this.puntoAgregadoEvent.emit(true)
  		    }
  		  })
  		}
  	})
  }

}	
