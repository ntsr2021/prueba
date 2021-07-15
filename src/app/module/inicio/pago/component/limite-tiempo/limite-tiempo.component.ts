import { Component, OnInit } from '@angular/core';

import { ReciboService } from './../../../../../shared/service/recibo.service';
import { HoraService } from './../../../../../shared/service/hora.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-limite-tiempo',
  templateUrl: './limite-tiempo.component.html',
  styleUrls: ['./limite-tiempo.component.css']
})
export class LimiteTiempoComponent implements OnInit 
{

	jwt = {
		token : window.localStorage.getItem('tokenCliente')
	}
	horaInicioCompra: any = null;

	mostrarAlerta = false;
	minRestantes: any = null;
	segRestantes: any = null;

	dosHoras = (2*60*60);
	cincoMinutos = (5*60);

	horaActual = null;
	horaLimite = null;

	activarReloj : any = null;



  constructor(private reciboService: ReciboService,
  						private horaService: HoraService,
  						private router: Router) { }



  ngOnInit(): void {
  	this.veriTiempoRestanteCompra();
  }



  veriTiempoRestanteCompra()
  {
  	this.reciboService.veriTiempoCarroCompra(this.jwt.token).subscribe(resp => 
  	{
  		this.horaInicioCompra = resp['fecha'].split(' ')[1].split(':');
  		this.horaInicioCompra = (parseInt(this.horaInicioCompra[0])*60*60)+(parseInt(this.horaInicioCompra[1])*60)+parseInt(this.horaInicioCompra[2]);

			this.horaLimite = this.horaInicioCompra + this.dosHoras;	


			this.horaService.consultar().subscribe(resp => 
	    {
	      this.horaActual = resp['hora'].split(':');
	      this.horaActual = (parseInt(this.horaActual[0])*60*60)+(parseInt(this.horaActual[1])*60)+parseInt(this.horaActual[2]);


	      this.reloj();
	      this.activarReloj = setInterval(()=> this.reloj(), 1000);

	    })
  	});
  }


  reloj()
  {
	  if(this.horaActual < this.horaLimite && this.horaActual >= (this.horaLimite-this.cincoMinutos))
	  {
	  	this.mostrarAlerta = true;

	  	this.minRestantes = (this.horaLimite-this.horaActual)/60;
	  	this.minRestantes = parseInt(this.minRestantes);
	  	this.segRestantes = (this.horaLimite-this.horaActual)%60;

	  }else if(this.horaActual >= this.horaLimite)
	  {
	  	this.reciboService.elimCarroCompra(this.jwt).subscribe(); // Eliminar carro de compra
	  	localStorage.setItem('bandSalirPago', '1'); // Avisar al Guard del modulo pago que debe salir de la ruta
	  	this.router.navigate(['carro']); // Redireccionar al carro de compra


	  	clearInterval(this.activarReloj); // Detener ejecucion del reloj
	  }

	  ++this.horaActual;
  }


}
