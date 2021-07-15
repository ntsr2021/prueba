import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DepartamentoService } from '../../../../../shared/service/departamento.service';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

	@Output() departamentoEditadoEvent = new EventEmitter();
	
	departamento = {
		id_departamento : null,
		nombre: null
	}


  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
  }


  consUno(id_departamento) 
  {
	  this.departamentoService.consUno(id_departamento).subscribe(resp => 
	  {
	    if(resp != null)
	    {
	    	this.departamento.id_departamento = id_departamento;
	    	this.departamento.nombre = resp['nombre'];

	    	setTimeout(()=> $('#departamento-editar-modal').modal('show'), 300)
	    }
	  })
  }


  editar()
  {
  	$('#departamento-editar-form').validate({
  		rules : {
  			nombre: { required:true, descripcion:true, maxlength:80 }
  		},
  		messages: {
  		  nombre: { required:'Campo requerido', maxlength:'Máximo 80 caracteres' }
  		},


  		submitHandler: ()=> 
  		{
  		  this.departamentoService.editar(this.departamento).subscribe(resp => 
  		  {
  		    if(resp['mens'] == 'OK')
  		    {
            $('#departamento-editar-modal').modal('hide');
  		      alertify.success('Departamento editado exitosamente');
  		      this.departamentoEditadoEvent.emit(true)
  		    }
  		  })
  		}
  	})
  }

}
