import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { BlogService } from '../../../../shared/service/blog.service';
import { FormatoFecha } from '../../../../shared/helper/formato-fecha';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit 
{

	@ViewChild(MatSort, {static: true}) sort: MatSort; 
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	dataSource = null;
	columnas = ['titulo', 'fecha', 'comentarios', 'ver_comentarios', 'editar', 'eliminar']; 

	articulos = null;


  constructor(private blogService: BlogService,
              private formatoFecha: FormatoFecha) { }


  ngOnInit(): void {
  	this.consArticulos();
  }


  consArticulos()
  { 
	  this.blogService.consTodos().subscribe(resp => 
	  {
	  	this.articulos = resp;


			if(this.articulos != null)
			{
				this.dataSource = new MatTableDataSource(this.articulos); 
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


  // Eliminar articulo
  eliminar(id_articulo_blog)
  {
  	alertify.confirm('Confirmar', '¿Estás seguro que deseas eliminar?',
  	  ()=> {
  	    this.blogService.eliminar(id_articulo_blog).subscribe(resp => 
  	    {
  	      if(resp['mens'] == 'OK') 
  	      {
  	        alertify.success('Articulo eliminado');
  	        this.consArticulos();
  	      }else 
  	        alertify.error('Ejecución fallida');
  	    });
  	  }, ()=>{});
  }


  // Permite formatear fecha 
  establecerFecha(fecha)
  {
    fecha = fecha.split(' ');

    return this.formatoFecha.fechaNombre(fecha[0]) + ' a las ' + this.formatoFecha.hora(fecha[1]);
  }


  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 

}
