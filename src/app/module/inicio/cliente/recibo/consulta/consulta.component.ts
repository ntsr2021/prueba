import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { ReciboService } from '../../../../../shared/service/recibo.service';
import { DolarService } from '../../../../../shared/service/dolar.service';

import { FormatoMoneda } from '../../../../../shared/helper/formato-moneda';

import { GenerarReciboComponent } from './../../../../../shared/component/generar-recibo/generar-recibo.component';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  @ViewChild('generar_recibo') generarReciboComponent: GenerarReciboComponent;

	@ViewChild(MatSort, {static: true}) sort: MatSort; 
	dataSource = null;
	columnas = ['codigo', 'nombre', 'cantidad', 'precio_$', 'precio_bs'];
	productos = null;
	dolar = null;
	id_recibo = null;

  recibo = null;
  pagos = null;


  constructor(private reciboService: ReciboService,
  						private activatedRoute: ActivatedRoute,
  						private dolarService: DolarService,
              public formatoMoneda: FormatoMoneda) { }


  ngOnInit(): void {
  	this.consDolar();

  	this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
  		this.id_recibo = parseInt(params.get('id_recibo'));


      this.reciboService.consUno(this.id_recibo).subscribe(resp => 
      {
        this.recibo = resp['datos'];
        this.recibo.tasa_dolar = parseFloat(this.recibo.tasa_dolar);

        this.pagos = resp['pagos'];
        if(this.pagos.length == 2) // Pago mixto -> pasar cantidades a float
        {
          this.pagos[0].monto = parseFloat(this.pagos[0].monto);
          this.pagos[1].monto = parseFloat(this.pagos[1].monto);
        }

        this.productos = resp['productos'];

        this.dataSource = new MatTableDataSource(this.productos); 
        this.dataSource.sort = this.sort;

      });


  	});
  }


  consDolar() {
  	this.dolarService.consultarOne().subscribe(resp => this.dolar = parseFloat(resp['valor']) );
  }

  consProducto() {
  	this.reciboService.consProducto(this.id_recibo).subscribe(resp => 
  	{
  		this.productos = resp;

      this.dataSource = new MatTableDataSource(this.productos); 
	    this.dataSource.sort = this.sort;
  	});
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 

  totalCantidad() {
    let total: number = 0;
    this.productos.forEach(e => total += parseInt(e.cantidad))
    return total;
  }

  total$() {
  	let total: number = 0;
  	this.productos.forEach(e => total += parseFloat(e.precio) * parseInt(e.cantidad))
  	return total.toFixed(2);
  }

  totalBs() {
  	let total: number = 0;
  	this.productos.forEach(e => total += (parseFloat(e.precio)*this.dolar * parseInt(e.cantidad)))
  	return total.toFixed(2);
  }


  generarRecibo(id_recibo){
    this.generarReciboComponent.generarRecibo(id_recibo)
  }

}
