import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PuntoEntregaService } from './../../../../../shared/service/punto-entrega.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
	selector: 'app-metodo-entrega',
	templateUrl: './metodo-entrega.component.html',
	styleUrls: ['./metodo-entrega.component.css']
})
export class MetodoEntregaComponent implements OnInit 
{
	puntos = null;
	metodo_entrega = {
		metodo: 'pick_up',
		punto: '',
		dir_punto: ''
	}

	@Output() metodoEntregaEvent = new EventEmitter();



	constructor(private puntoEntregaService : PuntoEntregaService) { }


	ngOnInit(): void {
		this.consPuntosEntrega();
	}


	consPuntosEntrega() {
		this.puntoEntregaService.consTodos().subscribe(resp => this.puntos = resp )
	}


	metodoEntrega()
	{
		$('.metodo-activa').hide();
		$('#'+this.metodo_entrega.metodo).show().addClass('metodo-activa');
	}


	siguiente()
	{  
		if(this.metodo_entrega.punto != '')
		{
			this.metodoEntregaEvent.emit(this.metodo_entrega);

			$('#stepper-item-2').removeClass('stepper-item-active');
			$('#stepper-item-3').addClass('stepper-item-active');

			$('#stepper-content-2').hide(100);
			$('#stepper-content-3').show(100);
		}
		else 
		{
			alertify.alert('Alerta', 'Debe seleccionar un punto de entrega para poder continuar');
		}
	}


	siguiente2() // Cuando el metodo es delivery
	{

		this.metodoEntregaEvent.emit(this.metodo_entrega);

		$('#stepper-item-2').removeClass('stepper-item-active');
		$('#stepper-item-3').addClass('stepper-item-active');

		$('#stepper-content-2').hide(100);
		$('#stepper-content-3').show(100);
	}


	anterior()
	{
		$('#stepper-item-2').removeClass('stepper-item-active');
		$('#stepper-item-1').addClass('stepper-item-active');

		$('#stepper-content-2').hide(100);
		$('#stepper-content-1').show(100);

		window.scroll(0, 0);
	}


	selecPuntoEntrega(punto, direccion)
	{
		this.metodo_entrega.punto = punto;
		this.metodo_entrega.dir_punto = direccion;


		$('#selec-punto-entrega-modal').modal('hide');
	}

}
