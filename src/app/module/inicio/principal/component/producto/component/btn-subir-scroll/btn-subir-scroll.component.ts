import { Component, OnInit } from '@angular/core';


declare var $:any;


@Component({
  selector: 'app-btn-subir-scroll',
  templateUrl: './btn-subir-scroll.component.html',
  styleUrls: ['./btn-subir-scroll.component.css']
})
export class BtnSubirScrollComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=> this.subirScroll(), 300);
  }


  subirScroll()
  {
    $(document).off('scroll'); // Vaciar historial de eventos para scroll

    // Aparecer boton
    $(document).on('scroll', function() {
      var scrollDistance = $(this).scrollTop();

      $('.scroll-to-top').stop();

      if (scrollDistance > 500) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });

    // Accionar boton
    $('.scroll-to-top').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 400);
    });
  }

  

}
