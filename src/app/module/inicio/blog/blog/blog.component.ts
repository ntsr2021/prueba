import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { BlogService } from './../../../../shared/service/blog.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit 
{

  contArt : number = 0;

  articulos = null;
  buscador = {
    busquedad : '',
    consultas : 0, 
    consInicial: 0, 
    totalConsultas : 10
  }

  activarSpinner = false;
  activarConsMasArticulos = false;



  constructor(private blogService: BlogService,
              private router: Router) { }



  ngOnInit(): void {
    this.desactivarFixedNavbar();

    this.consArticulosInicio();
  }


  desactivarFixedNavbar()
  {
    // Desactivar fixed del navbar principal 
    $('#inicio-navbar-fixed').css('position', 'relative');
    $('#main').css('margin-top', '0px');
  }


  // Consultar articulos cada vez que halla una busquedad de cualquier tipo
  consArticulosInicio() 
  {
    this.buscador.consultas = 0; 
    this.buscador.consInicial = 0;

    this.blogService.consBuscador(this.buscador).subscribe(resp => 
    {
      this.contArt = 0;


      if(resp != null) // Hay articulos  
      {
        this.articulos = new Array();

        let proAux: any = resp; 
        proAux.forEach(e => this.articulos[this.contArt++] = e );


        ++this.buscador.consultas; 
        this.buscador.consInicial = this.articulos.length;


        if(this.articulos.length == 9)
          this.activarConsMasArticulos = true; // activarBtnConsMas
        else 
          this.activarConsMasArticulos = false;

      }
      else // No hay articulos
      {
        this.articulos = false; 
        this.activarConsMasArticulos = false;
      } 
    });
  }


  consMasArticulos()
  {
    this.activarConsMasArticulos = false;
    this.activarSpinner = true;


    this.blogService.consBuscador(this.buscador).subscribe(resp => 
    {
      if(resp != null) 
      {
        let proAux: any = resp; 
        proAux.forEach(e => this.articulos[this.contArt++] = e );

        ++this.buscador.consultas; 
        this.buscador.consInicial = this.articulos.length;



        if(this.articulos.length == (this.articulos.consultas*9) && this.articulos.consultas < this.articulos.totalConsultas )
          this.activarConsMasArticulos = true;
        else
          this.activarConsMasArticulos = false;
      }else 
        this.activarConsMasArticulos = false;


      setTimeout(()=> this.activarSpinner = false, 300);// Desaparecer animacion spinner scroll
    });
  }



  // Ver detalles y subir scroll hasta arriba
  verDetalles(id_articulo_blog)
  {
    $(window).off('scroll');


    this.router.navigate(['blog/articulo/'+id_articulo_blog]);
    window.scroll(0,0);
  }


}
