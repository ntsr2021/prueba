import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoGrupoService {

	url = GlobalConstants.urlBase + 'departamento-grupo/';

  constructor(private http: HttpClient) { }


  consTodos() {
  	return this.http.get(`${this.url}cons-todos.php`);
  }

  consPorDepartamento(id) {
  	return this.http.get(`${this.url}cons-por-departamento.php?id=${id}`);
  }

  consPrimero() {
    return this.http.get(`${this.url}cons-primero.php`);
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

  consUno(id) {
    return this.http.get(`${this.url}cons-uno.php?id=${id}`);
  }

}
