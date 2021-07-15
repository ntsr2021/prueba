import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ReciboService } from './../../shared/service/recibo.service';

import * as alertify from 'alertifyjs';


@Injectable({
  providedIn: 'root'
})
export class PagoGuard implements CanActivate {

	jwt = {
		token : window.localStorage.getItem('tokenCliente')
	}
  band : boolean = false;
  prodCarro = localStorage.getItem('prodCarro');


	constructor(private router: Router,
              private reciboService: ReciboService) {}


  canActivate(): Observable<boolean> | boolean 
  { 
    let band = false;

    if(this.prodCarro != 'null' && this.prodCarro != null)
    {
      band = true;
    }else 
    {
      band = false;
      this.router.navigate(['']);
    }
    
    return band;
  }


  canDeactivate(): Observable<boolean> | boolean 
  {
    this.band = false;

    if(localStorage.getItem('pagoFinalizado') != null) // Verifica que la compra halla finalizado y permite el paso
    {
      this.band = true;
      localStorage.removeItem('pagoFinalizado'); 
    }

    else // Verificar que el usuario halla aceptado salir del modulo
    {
      if(localStorage.getItem('bandSalirPago') == null || localStorage.getItem('bandSalirPago') == '0')
      {
        alertify.confirm('Confirmar', '¿Estás seguro(a) que deseas cancelar la compra?', ()=> { // Salir


          this.reciboService.elimCarroCompra(this.jwt).subscribe(); // Elimiar carro de compra


          localStorage.setItem('bandSalirPago', '1');
          this.router.navigate(['']);

        }, ()=>{ // No salir
          localStorage.setItem('bandSalirPago', '0');
        })
      }


      if(localStorage.getItem('bandSalirPago') != null) 
      {
        if(localStorage.getItem('bandSalirPago') == '1')
          this.band = true;
        else 
          this.band = false;

        localStorage.removeItem('bandSalirPago');
      }
    }
    
    
    return this.band;
  }

 
}
