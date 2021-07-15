import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProductoService } from './../../../../../../shared/service/producto.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

	productos: any = new Array();

  contProd = 0;

  limit1 = 0;

  activarConsMas = false;

  animEspera = false;

  busq = null;


  constructor(private productoService: ProductoService,
  						private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
  	this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => 
  	{
  		// Resetear contadores
  		this.productos = new Array();
  		this.contProd = 0;
  		this.limit1 = 0;


  	  this.busq = parametros.get('busq');

  		this.consProductos();
  	})
  }


  consProductos()
  {
    this.activarConsMas = false;
  	this.animEspera = true;


  	this.productoService.consBusquedad(this.busq, this.limit1).subscribe(resp =>
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
    this.productoService.consBusquedad(this.busq, this.limit1).subscribe(resp => 
    {
      if(resp != null)
        this.activarConsMas = true;
      else
        this.activarConsMas = false;
    })
  }

}
