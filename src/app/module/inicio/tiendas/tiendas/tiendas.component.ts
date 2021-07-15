import { Component, OnInit } from '@angular/core';

import { TiendaService } from '../../../../shared/service/tienda.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

	tiendas = null;

  constructor(private tiendaService: TiendaService) { }

  ngOnInit(): void {
  	this.consTienda();
  }

  consTienda() {
  	this.tiendaService.consTodas().subscribe(resp => {
  		this.tiendas = resp;
  	})
  }

}
