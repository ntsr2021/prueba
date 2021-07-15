import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { BlogService } from '../../../../../shared/service/blog.service';
import { FormatoFecha } from '../../../../../shared/helper/formato-fecha';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

	articulo = {
		id_articulo_blog : null,
    titulo: null,
    etiquetas: null,
	  contenido: '',
	  fecha: null
	}

  fechaFormateada = null;

  vecEtiquetas: any = null;


  constructor(private blogService: BlogService,
  						private activatedRoute: ActivatedRoute,
              private formatoFecha: FormatoFecha) { }

  ngOnInit(): void {
    this.desactivarFixedNavbar();

  	this.consArticulo();
  }


  desactivarFixedNavbar()
  {
    // Desactivar fixed del navbar principal 
    $('#inicio-navbar-fixed').css('position', 'relative');
    $('#main').css('margin-top', '0px');
  }


  consArticulo()
  {
  	this.activatedRoute.paramMap.subscribe((params: ParamMap) => 
  	{
  	  this.articulo.id_articulo_blog = parseInt(params.get('id_articulo_blog'));


  	  this.blogService.consUno(this.articulo.id_articulo_blog).subscribe(resp => 
  	  {
  	  	this.articulo.contenido = resp['contenido'];
        this.articulo.titulo = resp['titulo'];
        this.articulo.etiquetas = resp['etiquetas'];
        this.articulo.fecha = resp['fecha'];


        // this.vecEtiquetas = this.articulo.etiquetas.split(',');


        $('#inicio-articulo-content').html((this.articulo.contenido));


        this.elimAttrCursorMultimedia(); // Eliminar atributo cursor:pointer de imgs y videos
        this.activarResponsiveMultimedia();
        $(window).resize(()=> this.activarResponsiveMultimedia() );


        $('#articulo-body').show();


        this.establecerFecha();
  	  });
  	});
  }


  elimAttrCursorMultimedia()
  {
    $('#inicio-articulo-content .video').css('cursor', 'auto');
    $('#inicio-articulo-content img').css('cursor', 'auto');
  }


  activarResponsiveMultimedia()
  {
    let widthWindow = screen.width;


    let videos = $('#inicio-articulo-content').find('.video');
    let imgs = $('#inicio-articulo-content').find('img');



    if(videos.length > 0)
    {
      videos.each(function()
      {
        let video = $(this);


        if(widthWindow > 1200)
        {
          if(video.hasClass('video-tam-grande'))
            video.attr('width', 900).attr('height', 500);

          else if(video.hasClass('video-tam-mediano'))
            video.attr('width', 600).attr('height', 337);

          else if(video.hasClass('video-tam-pequenio'))
            video.attr('width', 350).attr('height', 197);
        }

        else if(widthWindow <= 1200 && widthWindow > 990)
        {
          if(video.hasClass('video-tam-grande'))
            video.attr('width', 700).attr('height', 394);

          else if(video.hasClass('video-tam-mediano'))
            video.attr('width', 450).attr('height', 253);

          else if(video.hasClass('video-tam-pequenio'))
            video.attr('width', 320).attr('height', 180);
        }

        else if(widthWindow <= 990 && widthWindow > 767)
        {
          if(video.hasClass('video-tam-grande'))
            video.attr('width', 600).attr('height', 338);

          else if(video.hasClass('video-tam-mediano'))
            video.attr('width', 500).attr('height', 281);

          else if(video.hasClass('video-tam-pequenio'))
            video.attr('width', 300).attr('height', 169);
        }

        else if(widthWindow <= 767)
          video.attr('width', '100%').attr('height', 253);

        else if(widthWindow <= 376)
          video.attr('width', '100%').attr('height', 'auto');
      });
    }


    if(imgs.length > 0)
    {

      imgs.each(function()
      {
        let img = $(this);


        if(widthWindow > 768)
        {
          if(img.hasClass('img-tam-grande'))
            img.width(500);
          else if(img.hasClass('img-tam-mediano'))
            img.width(350);
          else 
            img.width(200);
        }

        else if(widthWindow <= 768 && widthWindow > 550)
        {
          if(img.hasClass('img-tam-grande'))
            img.width(400);
          else if(img.hasClass('img-tam-mediano'))
            img.width(280);
          else 
            img.width(180);
        }

        else if(widthWindow <= 550)
          img.width('100%');

      });
    }
  }


  establecerFecha()
  {
    let fechaHora = this.articulo.fecha.split(' ');
    
    this.fechaFormateada = this.formatoFecha.fechaNombre(fechaHora[0]) + ' a las ' + this.formatoFecha.hora(fechaHora[1]);
  }


}
