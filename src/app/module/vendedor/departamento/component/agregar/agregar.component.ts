import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { DepartamentoService } from '../../../../../shared/service/departamento.service';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {


	@Output() departamentoAgregadoEvent = new EventEmitter();
  @Input() id_departamento_grupo = null;
	nombre = null;


	
  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
  }

  agregar()
  {
  	$('#departamento-agregar-form').validate({
  		rules : {
  			nombre: { required:true, descripcion:true, maxlength:80 }
  		},
  		messages: {
  		  nombre: { required:'Campo requerido', maxlength:'Máximo 80 caracteres' }
  		},


  		submitHandler: ()=> 
  		{
        let departamento = {
          nombre: this.nombre,
          id_grupo_pertenece: this.id_departamento_grupo
        }

  		  this.departamentoService.agregar(departamento).subscribe(resp => 
  		  {
  		    if(resp['mens'] == 'OK')
  		    {
            $('#departamento-agregar-modal').modal('hide');
  		      alertify.success('Departamento agregado exitosamente');
  		      this.departamentoAgregadoEvent.emit(true)
  		    }
  		  })
  		}
  	})
  }

  reset(){
    this.nombre = null;
  }

}	
