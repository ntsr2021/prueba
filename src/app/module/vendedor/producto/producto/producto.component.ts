import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ProductoService } from '../../../../shared/service/producto.service';
import { DolarService } from '../../../../shared/service/dolar.service';
import { UserService } from '../../../../shared/service/user.service';
import { DepartamentoService } from '../../../../shared/service/departamento.service';
import { DepartamentoGrupoService } from '../../../../shared/service/departamento-grupo.service';

import { FormatoMoneda } from '../../../../shared/helper/formato-moneda';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit 
{


	@ViewChild(MatSort, {static: true}) sort: MatSort; 
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	dataSource = null;
	columnas : any; 

	productos = null;
	buscador = {
		busquedad : null,
		departamento1 : null
	}
	departamentos = null;

	dolar = 0; 

	marcaTiempo = 0;
	id_prod_act = null;

	dataSourceTotal = null;
	columnasTotal = ['productos', 'dolares', 'bolivares'];
	totales = [{
		'pro' : 0,
		'dol' : 0
	}];

	user = null;
	jwt = {
		token: window.localStorage.getItem('token')
	} 

	bandHayPromocion = false;


  constructor(private productoService: ProductoService,
  						private dolarService: DolarService,
  						private userService: UserService, 
  						private departamentoGrupoService: DepartamentoGrupoService, 
  						private departamentoService: DepartamentoService,
  						public formatoMoneda: FormatoMoneda) { }


  ngOnInit(): void 
  {
  	this.userService.consultar(this.jwt).subscribe(resp => 
		{
			this.user = resp;

	  	this.consulDolar();
	  	this.consDepartamentos();
	  })
  }


  // Consultar productos
  consProducto()
  { 
	  this.productoService.consTodos(this.buscador).subscribe(resp => 
	  {
	  	this.productos = resp;


	  	// Definir rol del usuario para la habilitacion de opciones
			if(this.user.rol == 'a')
				this.columnas = ['foto_prin', 'codigo', 'nombre', 'cantidad', 'precio_$', 'precio_bs', 'estatus', 'foto', 'editar', 'eliminar'];
			else 
				this.columnas = ['foto_prin', 'codigo', 'nombre', 'cantidad', 'precio_$', 'precio_bs', 'estatus', 'editar'];


			if(this.productos != null)
			{
				this.dataSource = new MatTableDataSource(this.productos); 
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator; 
			}else 
			{
				this.dataSource = new MatTableDataSource(); 
				this.dataSource.sort = this.sort;
				this.dataSource.paginator = this.paginator; 
			}
	    


	    this.hayPromocion();
	    this.obtTotales();
	  })
  }


  // Consultar valor del dolar 
  consulDolar(){
	  this.dolarService.consultarOne().subscribe(res => this.dolar = res['valor'] );
	}


	// Obtener totales de los productos (bs y $)
	obtTotales()
	{
		this.productoService.totales(this.buscador.departamento1).subscribe(res => 
		{
			this.totales[0].pro = res['pro'];

			
			if(res['dol'] == null)
				this.totales[0].dol = 0;
			else 
				this.totales[0].dol = parseFloat(res['dol']);


			this.dataSourceTotal = new MatTableDataSource(this.totales); 
		})
	}


	// Eliminar producto
	eliminar(id_producto)
	{
		alertify.confirm('Confirmar', '¿Estás seguro que deseas eliminar?',
		  ()=> {
		    this.productoService.eliminar(id_producto).subscribe(resp => 
		    {
		      if(resp['mens'] == 'OK') 
		      {
		        alertify.success('Producto eliminado');
		        this.consProducto();
		      }else 
		        alertify.error('Ejecución fallida');
		    });
		  }, ()=>{});
	}


	// Metodo especial para actualizar img con marca de tiempo 
	actualizarImg(event)
	{
		++this.marcaTiempo;
		this.id_prod_act = event;
		this.consProducto();
	}


	// Consultar departamentos vinculados al primer grupo
	consDepartamentos()
	{
		this.departamentoGrupoService.consPrimero().subscribe(resp => 
		{
		  let id_departamento_grupo = resp['id_departamento_grupo'];

		  this.departamentoService.consTodos(id_departamento_grupo).subscribe(resp => 
		  {
		  	this.departamentos = resp;
		  	this.buscador.departamento1 = this.departamentos[0].id_departamento;

		  	this.consProducto();
		  })
		});
	} 


	// Verificar si hay productos en promocion 
	hayPromocion(){
		this.productoService.hayPromocion().subscribe(resp => this.bandHayPromocion = resp['mens'] )
	}


	// Cancelar productos en promocion 
	cancelarPromocion()
	{
		alertify.confirm('Confirmar', '¿Está seguro(a) que desea desactivar todos los productos en promoción?', 
		()=> {
			this.productoService.cancelarPromocion().subscribe(resp => 
			{
				if(resp['mens'] == 'OK')
				{
					alertify.success('Productos en promoción desactivados');
					this.consProducto();
				}
			})
		}, ()=>{})
	}


}
