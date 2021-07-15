import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';

import { UserService } from './../../../shared/service/user.service';
import { FormatoMoneda } from './../../../shared/helper/formato-moneda';

import { GlobalConstants } from './../../../config/global-constants';


declare var $:any;


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

	@Input() itemSlide: any = null;
  primerItemActivo = false;


	user = null;
	jwt = {
	  token: localStorage.getItem('tokenCliente')
	}
	prodCarro = JSON.parse(localStorage.getItem('prodCarro'));


  constructor(private userService: UserService,
  						private router: Router,
  						public formatoMoneda: FormatoMoneda) { }


  ngOnInit(): void {
  	this.consUser();
  }


  // Comprobara si el usuario esta logueado permitiendo conocer si ha agregado algun producto
  consUser() 
  {
    if(this.jwt.token != null && this.jwt.token != undefined)
    {
      this.userService.consultar(this.jwt).subscribe(resp => 
      {
        this.user = resp;
      })
    }
  }


  activarPrimerItem()
  {
    if(!this.primerItemActivo)
    {
      this.primerItemActivo = true;
      return true;
    }else 
      return false;
  }


  proAgregado(codigo)
  {	
  	let band = false;

  	if(this.prodCarro != null && this.user != null)
  	{
  	  this.prodCarro.forEach(e => 
  	  {
  	    if(e.codigo == codigo)
  	      band = true;
  	  });
  	}
  	
  	return band;
  }


  verDetalles(id_producto)
  {
    location.href = GlobalConstants.site+'detalle/'+id_producto;
    // this.router.navigate(['']);
    // window.scroll(0,0);
  }

}
