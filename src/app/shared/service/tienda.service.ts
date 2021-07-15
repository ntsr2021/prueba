import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

	url = GlobalConstants.urlBase + 'tienda/';

  constructor(private http: HttpClient) { }


  consTodas() {
  	return this.http.get(`${this.url}cons-todas.php`);
  }

  consultarUno(id) {
  	return this.http.get(`${this.url}consultar-uno.php?id=${id}`);
  }

  consTiendaAct() {
  	return this.http.get(`${this.url}cons-tienda-act.php`);
  }
}
