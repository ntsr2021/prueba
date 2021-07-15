import { Component, OnInit } from '@angular/core';

import { PuntoEntregaService } from './../../../../shared/service/punto-entrega.service';


@Component({
  selector: 'app-punto-entrega',
  templateUrl: './punto-entrega.component.html',
  styleUrls: ['./punto-entrega.component.css']
})
export class PuntoEntregaComponent implements OnInit {

	puntos = null;

  constructor(private puntoEntregaService: PuntoEntregaService) { }

  ngOnInit(): void {
  	this.consTodos();
  }


  consTodos() {
  	this.puntoEntregaService.consTodos().subscribe(resp => this.puntos = resp)
  }

}
