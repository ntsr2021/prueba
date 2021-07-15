import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

	url = GlobalConstants.urlBase + 'departamento/';

  constructor(private http: HttpClient) { }


  consTodos(id) {
  	return this.http.get(`${this.url}cons-todos.php?id=${id}`);
  }

  consUno(id) {
  	return this.http.get(`${this.url}cons-uno.php?id=${id}`);
  }

  agregar(datos) {
  	return this.http.post(`${this.url}agregar.php`, JSON.stringify(datos));
  }

  editar(datos) {
  	return this.http.post(`${this.url}editar.php`, JSON.stringify(datos));
  }

  eliminar(id) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }

  consMenu() {
    return this.http.get(`${this.url}cons-menu.php`);
  }

  subir(id) {
    return this.http.get(`${this.url}subir.php?id=${id}`);
  }

  bajar(id) {
    return this.http.get(`${this.url}bajar.php?id=${id}`);
  }

}
