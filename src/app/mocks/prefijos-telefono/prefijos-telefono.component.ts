import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prefijos-telefono',
  templateUrl: './prefijos-telefono.component.html',
  styleUrls: ['./prefijos-telefono.component.css']
})
export class PrefijosTelefonoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  	this.leerArchivo();
  }


  leerArchivo()
  {
  	// let file = fopen(getScriptPath("myFile.txt"), 0);
  }

}
