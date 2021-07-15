import { Component, OnInit } from '@angular/core';
import { ReciboService } from './../../../../shared/service/recibo.service';
import { ClienteService } from './../../../../shared/service/cliente.service';
import { DolarService } from './../../../../shared/service/dolar.service';

import { FormatoMoneda } from './../../../../shared/helper/formato-moneda';

declare var $:any;


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

	totalVentas = null;
	totalGanancia = null;
	totalClientes = null;
	totalProdVendidos = null;
	dolar = 1;






  constructor(private reciboService : ReciboService,
  						private clienteService : ClienteService,
  						private dolarService: DolarService,
              public formatoMoneda: FormatoMoneda) { }

  ngOnInit(): void
  {
  	this.reciboService.totalVentas().subscribe(resp => this.totalVentas = resp['total'] );

  	this.reciboService.totalGanancia().subscribe(resp => 
    {
      if(resp['total'] == null)
        this.totalGanancia = 0;
      else 
        this.totalGanancia = parseFloat(resp['total']); 
    });

  	this.clienteService.totalClientes().subscribe(resp => this.totalClientes = resp['total'] );
  	this.reciboService.totalProdVendidos().subscribe(resp => this.totalProdVendidos = resp['total'] );
  	this.dolarService.consultarOne().subscribe(resp => this.dolar = resp['valor'] )
  }

}
