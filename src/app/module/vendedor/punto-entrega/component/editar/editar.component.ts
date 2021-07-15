import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PuntoEntregaService } from '../../../../../shared/service/punto-entrega.service';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

	@Output() puntoEditadoEvent = new EventEmitter();
	
	punto_entrega = {
		id_punto_entrega : null,
    nombre: null,
		direccion: null
	}


  constructor(private puntoEntregaService: PuntoEntregaService) { }

  ngOnInit(): void {
  }


  consUno(id_punto_entrega) 
  {
	  this.puntoEntregaService.consUno(id_punto_entrega).subscribe(resp => 
	  {
	    if(resp != null)
	    {
	    	this.punto_entrega.id_punto_entrega = id_punto_entrega;
        this.punto_entrega.nombre = resp['nombre'];
	    	this.punto_entrega.direccion = resp['direccion'];

	    	setTimeout(()=> $('#punto-entrega-editar-modal').modal('show'), 300)
	    }
	  })
  }


  editar()
  {
  	$('#punto-entrega-editar-form').validate({
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
  		  this.puntoEntregaService.editar(this.punto_entrega).subscribe(resp => 
  		  {
  		    if(resp['mens'] == 'OK')
  		    {
            $('#punto-entrega-editar-modal').modal('hide');
  		      alertify.success('Punto de entrega editado exitosamente');
  		      this.puntoEditadoEvent.emit(true)
  		    }
  		  })
  		}
  	})
  }

}
