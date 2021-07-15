import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class FormatoMoneda 
{

	// Funciona con el evento keyup
	setFormato(moneda) : any
	{
	  moneda = moneda.toString();


	  // Limipiar cantidad
	  moneda = moneda.replace(/\./g, ''); // Eliminar "."
	  moneda = moneda.replace(/\,/g, ''); // Eliminar ","
	  moneda = moneda.replace(/^(0+)/g, ''); // Eliminar "0" a la izquierda


	  // Formatear cantidad
	  let i = moneda.length-1;
	  let contPuntos = 1;
	  let cantDecimales = 0;
	  let monAux = '';
	  for(i; i>=0; i--)
	  {
	    // Añadir "," para los decimales
	    if(cantDecimales < 3)
	    {
	      if(cantDecimales == 0)
	        monAux = moneda[i]+'0,0';
	      else if(cantDecimales == 1)
	        monAux = moneda[i+1]+moneda[i]+',0';
	      else 
	      {
	        monAux = moneda[i+2]+moneda[i+1]+','+moneda[i];
	        ++contPuntos; // Empezar a sumar contPuntos xq empieza la parte entera de la cantidad
	      }

	      ++cantDecimales;
	    }

	    // Agregar "." a la cantidad
	    else
	    {
	      monAux += moneda[i];

	      if(contPuntos == 3)
	      {
	        if(moneda[i-1] != undefined)
	          monAux += '.';

	        contPuntos = 0;
	      }

	      ++contPuntos;
	    } 
	  }

	  // Reordenar cantidad
	  i = monAux.length-1;
	  let bsAux2 = '';
	  for(i; i>=0; i--)
	    bsAux2 += monAux[i];


	  // Retornar valor a bs con el formato correcto
	  moneda = bsAux2;
	  
	  if(moneda == '')
	  	moneda = '0,00';

	  return moneda;
	}


	// Funciona con el evento keypress
  validar(event)
  {
    let tecla = String.fromCharCode(event.keyCode);
    let vali = /[0-9]/.test(tecla);

    return vali;
  }


  // Limpia moneda a formato flotante
  limpiar(moneda)
  {
    moneda = moneda.replace(/\./g, '');

    return parseFloat(moneda.replace(/\,/g, '.'));
  }


}
