import { Component, OnInit } from '@angular/core';

import { GiftCardService } from '../../../../../../shared/service/gift-card.service';
import { FormatoMoneda } from '../../../../../../shared/helper/formato-moneda';
import { FormatoFecha } from '../../../../../../shared/helper/formato-fecha';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

	giftCard = null;


  constructor(private giftCardService: GiftCardService,
              public formatoMoneda: FormatoMoneda,
              public formatoFecha: FormatoFecha) { }


  ngOnInit(): void {
  }


  consultar(id_gift_card)
  {
  	this.giftCardService.consUna(id_gift_card).subscribe(resp => 
    {
      this.giftCard = resp;
      
      $('#gift-card-consulta-modal').modal('show');
    });
  }

}
