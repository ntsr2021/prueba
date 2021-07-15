import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { BlogService } from '../../../../../shared/service/blog.service';
import { FormatoFecha } from '../../../../../shared/helper/formato-fecha';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

	@ViewChild(MatSort, {static: true}) sort: MatSort; 
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	dataSource = null;
	columnas = ['autor', 'comentario', 'fecha', 'responder', 'eliminar']; 

	comentariosAux = null;
	comentarios = new Array();

	id_articulo_blog = null;

	articulo = {
		titulo: null
	}


  constructor(private activatedRoute: ActivatedRoute, 
  						private blogService: BlogService,
  						public formatoFecha: FormatoFecha) { }


  ngOnInit(): void 
  {
  	this.activatedRoute.paramMap.subscribe((params: ParamMap) => 
  	{
  		this.id_articulo_blog = params.get('id_articulo_blog');

  		this.consArticulo();
  		this.consComentarios();

  		// Actualizar comentarios vistos
    	setTimeout(()=> { this.actualizarComentNoVistos() }, 1000);
  	});
  }


  consArticulo()
  {
  	this.blogService.consUno(this.id_articulo_blog).subscribe(resp => this.articulo.titulo = resp['titulo'])
  }


  consComentarios()
  {
	  this.blogService.consComentarios(this.id_articulo_blog).subscribe(resp => 
	  {
	  	this.comentariosAux = resp;


	  	// Procesar consulta
	  	if(this.comentariosAux != null)
	  	{
	  		let j = 0;
	  		this.comentariosAux.forEach((e, i) =>
	  		{
	  			this.comentarios[j] = e;
	  			++j;


	  			if(e.coment_respuesta != undefined)
	  			{
	  				e.coment_respuesta.forEach((e, i) =>
	  				{
	  					this.comentarios[j] = e;
	  					this.comentarios[j].indent = 2;
	  					++j;


	  					if(e.coment_respuesta != undefined)
	  					{
	  						e.coment_respuesta.forEach((e, i) => 
	  						{
	  							this.comentarios[j] = e;
	  							this.comentarios[j].indent = 4;

	  							++j;
	  						})
	  					}
	  				})
	  			}
	  		});
	  	}
	  	////////////////////////


			if(this.comentarios != null)
			{
				this.dataSource = new MatTableDataSource(this.comentarios); 
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


  // Setea los comentarios no vistos a vistos
  actualizarComentNoVistos() {
    this.blogService.actualizarComentNoVistos(this.id_articulo_blog).subscribe(()=> this.consComentarios());
  }


  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 


  // Eliminar articulo
  eliminar(id_articulo_blog_coment)
  {
  	alertify.confirm('Confirmar', '¿Estás seguro que deseas eliminar?',
  	  ()=> {
  	    this.blogService.eliminarComentario(id_articulo_blog_coment).subscribe(resp => 
  	    {
  	      if(resp['mens'] == 'OK') 
  	      {
  	        alertify.success('Comentario eliminado');
  	        this.consComentarios();
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

}
