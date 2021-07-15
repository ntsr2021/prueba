import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})

export class BuscadorComponent implements OnInit {

  busquedad = null;
  @Output() buscarEvent = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }


  buscar() 
  {  
    this.buscarEvent.emit(this.busquedad);
  }

}
