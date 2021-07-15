import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { GiftCardService } from '../../../../../shared/service/gift-card.service';
import { FormatoMoneda } from '../../../../../shared/helper/formato-moneda';

import * as alertify from 'alertifyjs';
declare var $:any;



@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {


	@ViewChild(MatSort, {static: true}) sort: MatSort; 
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	dataSource = null;
	columnas = ['codigo', 'titulo', 'saldo', 'fecha_creacion', 'fecha_expiracion', 'remitente', 'consultar'];
	giftsCards = null;

	jwt = {
    token : window.localStorage.getItem('tokenCliente')
  }



  constructor(private giftCardService: GiftCardService,
              public formatoMoneda: FormatoMoneda) { }


  ngOnInit(): void {
  	this.consGiftsCards();
  }


  consGiftsCards()
  {
    this.giftCardService.consTodasCliente(this.jwt).subscribe(resp =>
	  {
      this.giftsCards = resp;


      if(this.giftsCards != null)
      {
        this.dataSource = new MatTableDataSource(this.giftsCards); 
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
      }else 
      {
      	this.dataSource = new MatTableDataSource(); 
      	this.dataSource.sort = this.sort;
      	this.dataSource.paginator = this.paginator; 
      }

	  });
  }


  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

}
