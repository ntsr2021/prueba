import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ProductoFotoService {

	url = GlobalConstants.urlBase + 'producto-foto/';

  constructor(private http: HttpClient) { }


  consultar(id_producto) {
  	return this.http.get(`${this.url}consultar.php?id_producto=${id_producto}`);
  }

  registrar(datos) {
  	return this.http.post(`${this.url}registrar.php`, JSON.stringify(datos));
  }


  eliminar(id_f, id_p, foto) {
    return this.http.get(`${this.url}eliminar.php?id_f=${id_f}&id_p=${id_p}&foto=${foto}`);
  }
}
