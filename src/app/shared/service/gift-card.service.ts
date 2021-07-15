import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class GiftCardService {

	url = GlobalConstants.urlBase + 'gift-card/';

  constructor(private http: HttpClient) { }


  consTodasCliente(datos) {
    return this.http.post(`${this.url}cons-todas-cliente.php`, JSON.stringify(datos));
  }

  consUna(id) {
    return this.http.get(`${this.url}cons-una.php?id=${id}`);
  }

  verificarSaldo(datos) {
  	return this.http.post(`${this.url}verificar-saldo.php`, JSON.stringify(datos));
  }
  
}