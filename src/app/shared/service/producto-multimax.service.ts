import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ProductoMultimaxService {

	url = GlobalConstants.urlBase + 'producto-multimax/';

  constructor(private http: HttpClient) { }

  consTodos(datos) {
    return this.http.post(`${this.url}cons-todos.php`, JSON.stringify(datos));
  }

  consUno(id_producto) {
    return this.http.get(`${this.url}cons-uno.php?id_producto=${id_producto}`);
  }

  consBuscador(datos) {
    return this.http.post(`${this.url}cons-buscador.php`, JSON.stringify(datos));
  }

  subirData(data) {
  	return this.http.post(`${this.url}subir-data.php`, JSON.stringify(data));
  }

  cargarDatos() {
  	return this.http.get(`${this.url}cargar-datos.php`);
  }

}
