import { Component, OnInit } from '@angular/core';

import { DolarService } from '../../../../shared/service/dolar.service';
import { ProductoService } from '../../../../shared/service/producto.service';

import { FormatoMoneda } from './../../../../shared/helper/formato-moneda';

declare var $:any;


@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.css']
})
export class Navbar2Component implements OnInit 
{
  moneda = 'dol';
  dolar = null;

  hayPromocion = false;


  constructor(private dolarService: DolarService,
              public formatoMoneda: FormatoMoneda,
              private productoService: ProductoService) { }


  ngOnInit(): void {
    this.consDolar();
    this.consHayPromocion();
  }


  // Consultar dolar
  consDolar() {
    this.dolarService.consultarOne().subscribe(resp => this.dolar = parseFloat(resp['valor']));
  }


  // Cambiar tipo de moneda (bs o $)
  cambiarMoneda()
  {
    if(this.moneda == 'bs')
    {
      $('.producto-moneda-tipo').each((i, e) =>
      {
        let precFloat = this.formatoMoneda.limpiar($(e).parent().find('.producto-moneda-precio').text());
        let precPro: any = precFloat * this.dolar;

        $(e).text('Bs. ');
        $(e).parent().find('.producto-moneda-precio').text(this.formatoMoneda.setFormato(precPro.toFixed(2)));
      })
    }
    else 
    {
      $('.producto-moneda-tipo').each((i, e) =>
      {
        let precFloat = this.formatoMoneda.limpiar($(e).parent().find('.producto-moneda-precio').text());
        let precPro: any = precFloat / this.dolar;

        $(e).text('$. ');
        $(e).parent().find('.producto-moneda-precio').text(this.formatoMoneda.setFormato(precPro.toFixed(2)));
      })
    }
  }


  // Consultar si hay promociones activas
  consHayPromocion() {
    this.productoService.hayPromocion().subscribe(resp => {
      this.hayPromocion = resp['mens'];
    })
  }


}