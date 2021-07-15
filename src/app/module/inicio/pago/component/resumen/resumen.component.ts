import { Component, OnInit } from '@angular/core';
import { DolarService } from '../../../../../shared/service/dolar.service';
import { FormatoMoneda } from '../../../../../shared/helper/formato-moneda';


@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

	prodCarro = JSON.parse(localStorage.getItem('prodCarro'));
	
	dolar = null;

	resumen = {
		productos: null,
		dolares: null,
		bolivares: null
	}


  constructor(private dolarService: DolarService,
  						public formatoMoneda: FormatoMoneda) { }

  ngOnInit(): void {
  	
  	this.dolarService.consultarOne().subscribe(resp => 
  	{
  		this.dolar = parseFloat(resp['valor']);

  		this.totalBs();
  		this.total$();
  		this.totalProductos();
  	})

  }


  totalBs()
  {
    let total = 0;

    this.prodCarro.forEach(e=> {
      total += parseFloat(e.precio)*e.can_comprar;
    });

    this.resumen.bolivares = (total*this.dolar);
    this.resumen.bolivares = parseFloat(this.resumen.bolivares);
  }


  total$()
  {
    let total = 0;

    this.prodCarro.forEach(e=> {
      total += parseFloat(e.precio)*e.can_comprar;
    });

    this.resumen.dolares = total;
    this.resumen.dolares = parseFloat(this.resumen.dolares);
  }


  totalProductos()
  {
    let productos = 0;
    this.prodCarro.forEach(e => productos += e.can_comprar )

    this.resumen.productos = productos;
  }

}
