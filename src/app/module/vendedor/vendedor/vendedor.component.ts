import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { VendedorService } from '../../../shared/service/vendedor.service';
import { UserService } from '../../../shared/service/user.service';
import { NotificacionAdministracionService } from '../../../shared/service/notificacion-administracion.service';
import { ReciboService } from '../../../shared/service/recibo.service';
import { BlogService } from '../../../shared/service/blog.service';
import { ClienteService } from '../../../shared/service/cliente.service';

import { FormatoFecha } from '../../../shared/helper/formato-fecha';

declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css', './vendedor-estilo2.component.css', './vendedor-estilo3.component.css', './vendedor-estilo4.component.css']
})
export class VendedorComponent implements OnInit 
{
	user = null;

  tipoUser = null;
  nombreUser = null;

  jwt = {
    token: null
  }

  notificaciones = null;
  contNotNuevas = null;

  opciones = '';

  numPedidosPendientes = 0;
  numComentSinVer = 0;


  constructor(private router: Router, 
  						private userService: UserService, 
  						private vendedorService: VendedorService,
              private notificacionAdministracionService: NotificacionAdministracionService,
              private reciboService: ReciboService,
              public formatoFecha: FormatoFecha,
              private blogService: BlogService) { }


  ngOnInit(): void {
  	this.consUser();
    setTimeout(()=> this.script(), 300);
  }


  

  consUser()
  {
    this.jwt.token = localStorage.getItem('token');

    this.userService.consultar(this.jwt).subscribe(resp => 
    {
      this.user = resp;

      // Consultar el tipo de usuario y nombre del mismo si es requerido
      this.consTipoUser();


      // Consultar notificaciones cada segundo
      this.consNotificaciones();
      setInterval(()=> this.consNotificaciones(), 1000);


      // Consultar numero de pedidos pendientes
      this.consNumPedidosPendientes();
      setInterval(()=> this.consNumPedidosPendientes(), 1000);


      // Consultar numero de comentarios pendientes del blog
      this.consNumComentNuevosBlog();
      setInterval(()=> this.consNumComentNuevosBlog(), 1000);
    })
  }


  consTipoUser()
  {
    if(this.user.rol == 'a' && this.user.id_user==1)
    {
      this.tipoUser = 'Administrador';
      this.nombreUser = '';
    }
    else if(this.user.rol == 'a' && this.user.id_user==3)
    {
      this.tipoUser = 'Sistema';
      this.nombreUser = '';
    }
    else if(this.user.rol == 's')
    {
      this.tipoUser = 'Supervisor(a): ';

      this.vendedorService.consUno(this.user.id_user).subscribe(resp => this.nombreUser = resp['username']);
    }
    else if(this.user.rol == 'v')
    {
      this.tipoUser = 'Vendedor(a): ';

      this.vendedorService.consUno(this.user.id_user).subscribe(resp => this.nombreUser = resp['username']);
    }
    else if(this.user.rol == 'd')
    {
      this.tipoUser = 'Despachador';
      this.nombreUser = '';
    }
  }


  consNotificaciones() 
  {
    this.notificacionAdministracionService.consultar(this.user.id_user).subscribe(resp => 
    {
      this.notificaciones = resp;

      this.contNotNuevas = 0;

      if(this.notificaciones != null)
      {
        this.notificaciones.forEach(e => 
        {
          if(e.estatus=='a')
            ++this.contNotNuevas;
        })
      }
      
    })
  }


  desacNotificaciones() {
    this.notificacionAdministracionService.desactivar(this.user.id_user).subscribe(resp => { })
  }


  consNumPedidosPendientes() {
    this.reciboService.totalPendientes().subscribe(resp => this.numPedidosPendientes = resp['total']);
  }

  consNumComentNuevosBlog() {
    this.blogService.totalComentariosSinVer().subscribe(resp => this.numComentSinVer = resp['total']);
  }


  // Buscador de opciones
  buscarOpcion()
  {
    switch (this.opciones) 
    {
      case 'ventas':
        this.router.navigate(['./vendedor/recibo']);
        break;
      case 'inventario':
        this.router.navigate(['./vendedor/producto']);
        break;
      case 'dolar':
        this.router.navigate(['./vendedor/dolar']);
        break;
      case 'clientes':
        this.router.navigate(['./vendedor/usuario']);
        break;
      case 'vendedores':
        this.router.navigate(['./vendedor/usuario/vendedor']);
        break;
      case 'cierre tienda':
        this.router.navigate(['./vendedor/cierre-tienda']);
        break;
      case 'banner principal':
        this.router.navigate(['./vendedor/banner']);
        break;
      case 'banner marcas':
        this.router.navigate(['./vendedor/banner']);
        break;
      case 'departamentos':
        this.router.navigate(['./vendedor/departamento']);
        break;
      case 'tiendas':
        this.router.navigate(['./vendedor/punto_entrega']);
        break;
      case 'centros de acopio':
        this.router.navigate(['./vendedor/punto_entrega']);
        break;
      case 'cambiar contraseña':
        this.router.navigate(['./vendedor/seguridad']);
        break;
    }
  }


  script()
  {
    // Ocultar y mostrar barra lateral de navegacion
    $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    });

    // Scroll to top button appear
    $(document).off('scroll'); // Vaciar historial de eventos para scroll
    
    $(document).on('scroll', function() {

      $('#scroll-to-top2').stop();

      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });

    // Subir scroll con boton up
    $('.scroll-to-top').on('click', function(e) {
      e.preventDefault();
      let top = $('#page-top').offset().top;
      $('html, body').animate({
        scrollTop: top
      }, 400);
    });

  }


  salir() 
  {  
    this.userService.cerrarSesionAdministrativa();
    this.router.navigateByUrl('login');
  }

}
