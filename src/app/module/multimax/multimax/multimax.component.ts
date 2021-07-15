import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormatoMoneda } from './../../../shared/helper/formato-moneda';
import { ProductoMultimaxService } from './../../../shared/service/producto-multimax.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-multimax',
  templateUrl: './multimax.component.html',
  styleUrls: ['./multimax.component.css']
})
export class MultimaxComponent implements OnInit 
{
	contProd : number = 0;

	productos = null;
	buscador = {
    busquedad : '',
    consultas : 0, 
    consInicial: 0, 
    totalConsultas : 10
  }

  activarConsultaScroll = true;
  spinnerScroll = false;
  activarConsMas = false;

  marcaTiempo: any = localStorage.getItem('marcaTiempo');



  constructor(private productoMultimaxService: ProductoMultimaxService,
  						private router: Router,
  						public formatoMoneda: FormatoMoneda) { }


  ngOnInit(): void {
    this.procesarBusquedad();
    this.subirScroll();
    // this.onScroll();
  }


 	procesarBusquedad()
 	{
    // Resetear buscador
    this.buscador.consultas = 0; 
    this.buscador.consInicial =  0;


    this.consProductosInicio();
 	}


 	// Consultar productos cada vez que halla una busquedad de cualquier tipo
 	consProductosInicio() 
 	{
 	  this.productoMultimaxService.consBuscador(this.buscador).subscribe(resp => 
 	  {
 	    this.contProd = 0;


 	    if(resp != null) // Hay productos  
 	    {
 	      this.productos = new Array();

 	      let proAux: any = resp; 
 	      proAux.forEach(e => this.productos[this.contProd++] = e );


 	      ++this.buscador.consultas; 
 	      this.buscador.consInicial = this.productos.length;


 	      // Activar animacion de espera para consulta con scroll
 	      if(this.productos.length == 16)
 	      {
 	        // this.activarConsultaScroll = true;
 	        /*setTimeout(()=> this.onScroll(), 1000); // Empezar consulta por scroll*/
 	        this.activarConsMas = true;
 	      }else 
 	        this.activarConsMas = false;

 	    }
 	    else // No hay productos
 	    {
 	      this.productos = false; 
 	      this.activarConsMas = false;
        // this.activarConsultaScroll = false;
 	    } 
 	  });
 	}


 	// Consultar productos a medida que baja el scroll
 	/*onScroll() 
 	{ 
 	  let activarConsultaLocal = true;

 	  $(window).scroll(()=>
 	  {
 	    let proPrin = $('#multimax-producto-perfume');
 	    let heiProPrin = (proPrin.position().top + proPrin.height())-1200;
 	    let scroll = $(document).scrollTop();



 	    if(scroll >= heiProPrin)
 	    {
 	      if(activarConsultaLocal == true)
 	      { 
 	        activarConsultaLocal = false;
 	        this.consProductosScroll(); 
 	        setTimeout(()=> activarConsultaLocal = true, 1000 )
 	      }
 	    }
 	  })
 	}*/


 	// Consultar productos mediante scroll
 	/*consProductosScroll()
 	{
 	  if(this.activarConsultaScroll == true)
 	  {
 	    this.spinnerScroll = true;


 	    this.productoMultimaxService.consBuscador(this.buscador).subscribe(resp => 
 	    {
 	      if(resp != null) 
 	      {
 	        let proAux: any = resp; 
 	        proAux.forEach(e => this.productos[this.contProd++] = e );

 	        ++this.buscador.consultas; 
 	        this.buscador.consInicial = this.productos.length;



 	        if(this.productos.length == (this.buscador.consultas*16) && this.buscador.consultas < this.buscador.totalConsultas )
 	        {
 	          this.activarConsultaScroll = true;
 	          this.activarConsMas = true;
 	        }
 	        else
 	        {
 	          this.activarConsultaScroll = false;
 	          this.activarConsMas = false;
 	        }
 	      }else 
 	      {
 	        this.activarConsultaScroll = false;
 	        this.activarConsMas = false;
 	      }


 	      setTimeout(()=> this.spinnerScroll = false, 300);// Desaparecer animacion spinner scroll
 	    });
 	  }
 	}*/


  // Btn consultar mas 
  consMas()
  {
    this.activarConsMas = false;

    
    this.spinnerScroll = true;


    this.productoMultimaxService.consBuscador(this.buscador).subscribe(resp => 
    {
      if(resp != null) 
      {
        let proAux: any = resp; 
        proAux.forEach(e => this.productos[this.contProd++] = e );

        ++this.buscador.consultas; 
        this.buscador.consInicial = this.productos.length;



        if(this.productos.length == (this.buscador.consultas*16) && this.buscador.consultas < this.buscador.totalConsultas )
        {
          this.activarConsMas = true;
        }
        else
        {
          this.activarConsMas = false;
        }
      }else 
      {
        this.activarConsMas = false;
      }


      setTimeout(()=> this.spinnerScroll = false, 300);// Desaparecer animacion spinner scroll
    });
  }


 	// Subir scroll con boton UP 
 	subirScroll()
 	{
 	  $(document).off('scroll'); // Vaciar historial de eventos para scroll

 	  // Aparecer boton
 	  $(document).on('scroll', function() {
 	    var scrollDistance = $(this).scrollTop();

 	    $('.scroll-to-top2').stop();

 	    if (scrollDistance > 500) {
 	      $('.scroll-to-top2').fadeIn();
 	    } else {
 	      $('.scroll-to-top2').fadeOut();
 	    }
 	  });

 	  // Accionar boton
 	  $('.scroll-to-top2').on('click', function(e) {
 	    e.preventDefault();
 	    $('html, body').animate({
 	      scrollTop: 0
 	    }, 400);
 	  });
 	}




 	// Ver detalles y subir scroll hasta arriba
 	verDetalles(id_producto)
 	{
    $(window).off('scroll');


 	  this.router.navigate(['./multimax/detalle/'+id_producto]);
 	  window.scroll(0,0);
 	}


  // Obtener resultado de la busquedad 
  resulBusquedad(event)
  {
    this.buscador.busquedad = event;

    this.procesarBusquedad();
  }

}
