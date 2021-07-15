import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';

import { ProductoService } from './../../../../../../shared/service/producto.service';
import { DepartamentoService } from './../../../../../../shared/service/departamento.service';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

	productos: any = null;

  contProd = 0;

  activarConsMas = false;

  animEspera = false;


  categoria = {
  	id_departamento1: null,
  	id_departamento2: null,
  	id_departamento3: null,
  	limit1: 0
  }

  departamento1: any = false;
  departamento2: any = false;
  departamento3: any = false;


  constructor(private productoService: ProductoService,
  						private departamentoService: DepartamentoService,
  						private activatedRoute: ActivatedRoute,
  						private router: Router) { }


  ngOnInit(): void {

  	this.activatedRoute.paramMap.subscribe((parametros: ParamMap) => 
  	{
  		// Resetear contadores
  		this.productos = new Array();


  		this.contProd = 0;
  		this.categoria.limit1 = 0;


      this.departamento1 = false;
      this.departamento2 = false;
      this.departamento3 = false;


  	  let departamentos = parametros.get('departamentos').split(',');


  	  this.procesarDepartamentos(departamentos);

  		this.consProductos();
  	})
  }


  procesarDepartamentos(departamentos)
  {
  	if(departamentos[0] != '')
  	{
  	  this.departamentoService.consUno(departamentos[0]).subscribe(resp => this.departamento1 = resp['nombre'] );
  	  this.categoria.id_departamento1 = departamentos[0];
  	}
  	else 
  	{
  	  this.departamento1 = null;
  	  this.categoria.id_departamento1 = null;
  	}

  	if(departamentos[1] != '')
  	{
  	  this.departamentoService.consUno(departamentos[1]).subscribe(resp => this.departamento2 = resp['nombre'] );
  	  this.categoria.id_departamento2 = departamentos[1];
  	}
  	else 
  	{
  	  this.departamento2 = null;
  	  this.categoria.id_departamento2 = null;
  	}

  	if(departamentos[2] != '')
  	{
  	  this.departamentoService.consUno(departamentos[2]).subscribe(resp => this.departamento3 = resp['nombre'] );
  	  this.categoria.id_departamento3 = departamentos[2];
  	}
  	else 
  	{
  	  this.departamento3 = null;
  	  this.categoria.id_departamento3 = null;
  	}
  }


  consProductos()
  {
    this.activarConsMas = false;
  	this.animEspera = true;

  	this.productoService.consPorCategoria(this.categoria).subscribe(resp =>
  	{
  		if(resp != null)
  		{
	  		let proAux: any = resp;
	  		proAux.forEach(e => this.productos[this.contProd++] = e );


	  		this.categoria.limit1 += 16;


        this.veriExisMasProductos();

  		}else 
  			this.productos = -1;


  		this.animEspera = false;
  	})
  }


  veriExisMasProductos()
  {
    this.productoService.consPorCategoria(this.categoria).subscribe(resp => 
    {
      if(resp != null)
        this.activarConsMas = true;
      else
        this.activarConsMas = false;
    })
  }



  // Filtrar por departamentos (semillero)
  filtrarDep1()
  {
    let busquedad = this.categoria.id_departamento1 + ',,';

    this.router.navigate(['categoria/'+busquedad]);
  }


  filtrarDep2()
  {
    let busquedad = this.categoria.id_departamento1 + ',' + this.categoria.id_departamento2 + ',';

    this.router.navigate(['categoria/'+busquedad]);
  }

}
