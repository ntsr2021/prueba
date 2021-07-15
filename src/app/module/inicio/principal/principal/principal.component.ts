import { Component, OnInit, ViewChild } from '@angular/core';

import { DepartamentoService } from './../../../../shared/service/departamento.service';

declare var $:any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {




  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
  	this.script();
  }



  script()
  {
  	// Aparecer elemento
  	let animado = document.querySelectorAll('.aparecer');
  	const f = function() {
  	  let scrollTop = document.documentElement.scrollTop;
  	  for(var i=0; i < animado.length; i++) {
  	    let alturaAnimado = $(animado[i]).offset().top - 700;  
  	    if(alturaAnimado < scrollTop) {
  	      $(animado[i]).css('opacity', 1);
  	      animado[i].classList.add('mostrarArriba');
  	    }
  	  }
  	}
  	window.addEventListener('scroll', f);
  	//////////////////
  }

}
