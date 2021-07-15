import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReciboService } from './../../../../shared/service/recibo.service';

declare var $:any;
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-pago',
  templateUrl: 'pago.component.html',
  styleUrls: ['pago.component.css']
})
export class PagoComponent implements OnInit 
{

  metodo_entrega = null;
  jwt = {
    token: localStorage.getItem('tokenCliente')
  }


  constructor(private router: Router,
              private reciboService: ReciboService) {}


  ngOnInit() {
    
  }

  
  


  metodoEntrega(event) {
    this.metodo_entrega = event;
  }

 

  // activarItem()
  // {
  //   if(!$(this).hasClass('stepper-item-active'))
  //   {
  //     let idElAnterior = $('.stepper-item-active').attr('data-target');
  //     let idEl = $(this).attr('data-target');

  //     $('.stepper-item-active').removeClass('stepper-item-active');
  //     $(this).addClass('stepper-item-active');

  //     $(idElAnterior).hide(100);
  //     $(idEl).show(100);
  //   }
  // }


}