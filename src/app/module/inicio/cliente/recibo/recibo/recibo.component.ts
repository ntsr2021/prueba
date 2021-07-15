import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ReciboService } from '../../../../../shared/service/recibo.service';
import { UserService } from '../../../../../shared/service/user.service';
import { ClienteService } from '../../../../../shared/service/cliente.service';
import { DolarService } from '../../../../../shared/service/dolar.service';

import { FormatoMoneda } from '../../../../../shared/helper/formato-moneda';

import { GenerarReciboComponent } from './../../../../../shared/component/generar-recibo/generar-recibo.component';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {


	@ViewChild(MatSort, {static: true}) sort: MatSort; 
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	dataSource = null;
	columnas = ['codigo', 'fecha', 'hora', 'productos', 'monto', 'monto_bs', 'estado', 'consulta'];
	recibos = null;

  dolar = null;

  jwt = {
    token : window.localStorage.getItem('tokenCliente')
  }

  @ViewChild('generar_recibo') generarReciboComponent: GenerarReciboComponent;


 


  constructor(private dolarService: DolarService,
              private reciboService: ReciboService,
              private userService: UserService,
              private clienteService: ClienteService,
              public formatoMoneda: FormatoMoneda) { }


  ngOnInit(): void {
    this.consDolar();
  	this.consultar();
  }


  consDolar() {
    this.dolarService.consultarOne().subscribe(resp => this.dolar = parseFloat(resp['valor']))
  }


  consultar()
  {
    this.reciboService.consCliente(this.jwt).subscribe(resp =>
	  {
      this.recibos = resp;

      if(this.recibos != null)
      {
        this.dataSource = new MatTableDataSource(this.recibos); 
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
      }
	  });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filtro.trim().toLowerCase();
  }


  generarRecibo(id_recibo){
    this.generarReciboComponent.generarRecibo(id_recibo)
  }

}