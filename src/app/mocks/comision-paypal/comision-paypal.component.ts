import { Component, OnInit } from '@angular/core';

import * as alertify from 'alertifyjs';

declare var $:any;

@Component({
  selector: 'app-comision-paypal',
  templateUrl: './comision-paypal.component.html',
  styleUrls: ['./comision-paypal.component.css']
})
export class ComisionPaypalComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

    let veri = false;

    alertify.confirm('Confirmar', '¿Está seguro(a) que desea finalizar la compra?', ()=> veri=true );

    alert(veri);
      
  }


  calcularComision() 
  {
    var pagar = parseFloat($('[name="pagar"]').val());

		var porcComision = 5.4;
    var dolComision = 0.30;



    var enviar = (100 * (dolComision + pagar)) / ((0 - porcComision) + 100);
    enviar = Math.round(enviar * 100) / 100;


    var comision:any = enviar - pagar;
    comision = Math.round(comision * 100) / 100;



    $('[name="enviar"]').val(enviar);
    $('[name="comision"]').val(comision);
	}


}
