import { Component, OnInit } from '@angular/core';

import { ProductoService } from './../../../../../../shared/service/producto.service';


@Component({
  selector: 'app-recientes',
  templateUrl: './recientes.component.html',
  styleUrls: ['./recientes.component.css']
})
export class RecientesComponent implements OnInit {

	productos: any = new Array();

  numConsultas = 0; // Permite conocer y limitar la cantidad de productos a mostrar
  totalConsultas = 3;
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

  	this.productoService.consRecientes(this.limit1).subscribe(resp =>
  	{
  		if(resp != null)
  		{
	  		let proAux: any = resp;
	  		proAux.forEach(e => this.productos[this.contProd++] = e );


	  		this.limit1 += 16;
	  		++this.numConsultas;


	  		if(this.numConsultas < this.totalConsultas)
	  		{
					// Verifica si existen mas productos
			    this.veriExisMasProductos();
	  		}else 
	  		{
	  			this.activarConsMas = false;
	  		}
  		}else 
  			this.productos = -1;


  		this.animEspera = false;
  	})
  }


  veriExisMasProductos()
  {
    this.productoService.consRecientes(this.limit1).subscribe(resp => 
    {
      if(resp != null)
        this.activarConsMas = true;
      else
        this.activarConsMas = false;
    })
  }

}
