import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pro-resena',
  templateUrl: './pro-resena.component.html',
  styleUrls: ['./pro-resena.component.css']
})
export class ProResenaComponent implements OnInit {

	resena = {
		comentario: null,
		puntaje: null,
		id_producto: null,
		id_user: null
	}


  constructor() { }

  ngOnInit(): void {
  }


  comentar()
  {
  	console.log('Comentar');
  }

}
