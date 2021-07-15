import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ProductoMultimaxService } from '../../../../shared/service/producto-multimax.service';

import { FormatoMoneda } from '../../../../shared/helper/formato-moneda';

@Component({
  selector: 'app-perfume-multimax',
  templateUrl: './perfume-multimax.component.html',
  styleUrls: ['./perfume-multimax.component.css']
})
export class PerfumeMultimaxComponent implements OnInit {

	@ViewChild(MatSort, {static: true}) sort: MatSort; 
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	dataSource = null;
	columnas : any = ['codigo', 'nombre', 'precio']; 

	productos = null;

	busquedad = null;


  constructor(private productoMultimaxService: ProductoMultimaxService,
  						public formatoMoneda: FormatoMoneda) { }


  ngOnInit(): void {
  	this.consProducto();
  }


  // Consultar productos
  consProducto()
  { 
	  this.productoMultimaxService.consTodos(this.busquedad).subscribe(resp => 
	  {
	  	this.productos = resp;


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
	  })
  }

}
