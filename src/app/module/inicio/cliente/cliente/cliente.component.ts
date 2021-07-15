import { Component, OnInit } from '@angular/core';

import { ClienteService } from '../../../../shared/service/cliente.service';
import { UserService } from '../../../../shared/service/user.service';
import { NotificacionClienteService } from '../../../../shared/service/notificacion-cliente.service';

import { GlobalConstants } from '../../../../config/global-constants';
import { FormatoFecha } from '../../../../shared/helper/formato-fecha';

declare var $:any;


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css', './cliente-estilo2.component.css', './cliente-estilo3.component.css', './cliente-estilo4.component.css']
})
export class ClienteComponent implements OnInit {

  user = null;
  cliente = null;
  jwt = {
    token: window.localStorage.getItem('tokenCliente')
  }
  notificaciones = null;

  contNotNuevas = null;


  constructor(private clienteService: ClienteService,
              private userService: UserService, 
              private notificacionClienteService: NotificacionClienteService,
              public formatoFecha: FormatoFecha) { }


  ngOnInit(): void {
    this.consCliente();
  	setTimeout(()=> this.script(), 300);
  }



  consCliente() {
    this.userService.consultar(this.jwt).subscribe(resp => 
    {
      this.user = resp;
      this.clienteService.consUno(this.user.id_user).subscribe(resp => this.cliente = resp);


      // Consultar notificaciones cada segundo
      this.consNotificaciones();
      setInterval(()=> this.consNotificaciones(), 1000);

    })
  }


  consNotificaciones() 
  {
    this.notificacionClienteService.consultar(this.user.id_user).subscribe(resp => 
    {
      this.notificaciones = resp;

      this.contNotNuevas = 0;

      if(this.notificaciones != null)
      {
        // Aumentar contador de notificaciones nuevas o activas
        this.notificaciones.forEach(e => 
        {
          if(e.estatus == 'a')
            ++this.contNotNuevas;
        })
      }
      
    })
  }

  desacNotificaciones() {
    this.notificacionClienteService.desactivar(this.user.id_user).subscribe(resp => { })
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

    // Close any open menu accordions when window is resized below 768px
    /*$(window).resize(function() {
      if ($(window).width() < 768) {
        $('.sidebar .collapse').collapse('hide');
      };
      
      // Toggle the side navigation when window is resized below 480px
      if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
        $("body").addClass("sidebar-toggled");
        $(".sidebar").addClass("toggled");
        $('.sidebar .collapse').collapse('hide');
      };
    });*/

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
    $(document).on('scroll', function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });
  }

  salir() 
  {  
    this.userService.cerrarSesionCliente();
    window.location.href = GlobalConstants.site;
  }


  

}
