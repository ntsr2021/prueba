import { Component, OnInit } from '@angular/core';

import { ProductoService } from './../../../../../../shared/service/producto.service';


@Component({
  selector: 'app-mas-vendidos',
  templateUrl: './mas-vendidos.component.html',
  styleUrls: ['./mas-vendidos.component.css']
})
export class MasVendidosComponent implements OnInit {

	productos: any = new Array();

  contProd = 0;

  limit1 = 0;

  activarConsMas = false;

  animEspera = false;


  constructor(private productoService: ProductoService) { }


  ngOnInit(): void {
  	this.consProductos();
  }


  consProductos()
  {
    this.activarConsMas = false;
  	this.animEspera = true;

  	this.productoService.consMasVendidos(this.limit1).subscribe(resp =>
  	{
  		if(resp != null)
  		{
	  		let proAux: any = resp;
	  		proAux.forEach(e => this.productos[this.contProd++] = e );


	  		this.limit1 += 16;


		    this.veriExisMasProductos();

  		}else 
  			this.productos = -1;


  		this.animEspera = false;
  	})
  }


  veriExisMasProductos()
  {
    this.productoService.consMasVendidos(this.limit1).subscribe(resp => 
    {
      if(resp != null)
        this.activarConsMas = true;
      else
        this.activarConsMas = false;
    })
  }

}
