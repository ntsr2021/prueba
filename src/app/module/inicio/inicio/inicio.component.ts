import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReciboService } from './../../../shared/service/recibo.service';

declare var $:any;


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  token = window.localStorage.getItem('token');


  constructor(private router: Router) { }

  ngOnInit(): void {
    $('#ftco-loader').fadeOut(100); // Ocultar animacion loading

    this.redirecCuenta();
    this.script();
  }


  redirecCuenta()
  {
    // if(this.token != null && this.token != undefined)
    //   this.router.navigateByUrl('cliente')
  }


  script() {
    // Subir scroll 
    $('#subir').click(function(e){  
      e.preventDefault();
      $('html, body').animate({'scrollTop':'0px'}, 500);
    });
    ///////////////////
  }


}
