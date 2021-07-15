import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class FormatoFecha {

	fechaNombre(fechaIngresada)
	{
	  let meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');

	  let fecha = fechaIngresada.split('-');

	  let dia = fecha[2];
	  let mes = fecha[1];
	  let anio = fecha[0];


	  let fechaString = dia + ' de ' + meses[mes-1] + ' del ' + anio;

	  return fechaString;
	}


	fechaSoloNumeros(fechaIngresada)
	{
	  let fecha = fechaIngresada.split('-');

	  let dia = fecha[2];
	  let mes = fecha[1];
	  let anio = fecha[0];


	  let fechaString = dia + '-' + mes + '-' + anio;

	  return fechaString;
	}


	hora(timeIngresado)
	{
		let time = timeIngresado.split(':');

		let hora = parseInt(time[0]);
		let min = time[1];
		let seg = time[2];


		let turno = null;
		if(hora > 12) // Tarde
		{
		  hora -= 12;
		  turno = 'pm.'; 
		}else // Mañana
		{  
		  turno = 'am.';
		}


		let horaString = hora + ':' + min + ' ' + turno;
		
		return horaString;
	}

}
