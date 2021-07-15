import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

	url = GlobalConstants.urlBase + 'cliente/';

  constructor(private http: HttpClient) { }

  registrar(datos) {
  	return this.http.post(`${this.url}registrar.php`, JSON.stringify(datos));
  }

  regisProd(datos) {
  	return this.http.post(`${this.url}regis-prod.php`, JSON.stringify(datos));
  }

  editar(datos) {
    return this.http.post(`${this.url}editar.php`, JSON.stringify(datos));
  }


  consulProd(id) {
    return this.http.get(`${this.url}consultar-prod.php?id=${id}`);
  }


  consultar(ci) {
  	return this.http.get(`${this.url}consultar.php?ci=${ci}`);
  }

  consVendedor(id, busquedad) {
    return this.http.get(`${this.url}cons-vendedor.php?id=${id}&busquedad=${busquedad}`);
  }

  consUno(id) {
    return this.http.get(`${this.url}cons-uno.php?id=${id}`);
  }

  consTodo(busquedad) {
    return this.http.get(`${this.url}cons-todo.php?busquedad=${busquedad}`);
  }

  consultarVendedor() {
    return this.http.get(`${this.url}consultar-vendedor.php`);
  }

  checkear(id) {
    return this.http.get(`${this.url}checkear.php?id=${id}`);
  }

  revertir(id) {
    return this.http.get(`${this.url}revertir.php?id=${id}`);
  }

  actualizar() {
    return this.http.get(`${this.url}actualizar.php`);
  }

  verificarDatos(datos) {
    return this.http.post(`${this.url}verificar-datos.php`, JSON.stringify(datos));
  }

  consActivo(datos) {
    return this.http.post(`${this.url}cons-activo.php`, JSON.stringify(datos));
  }

  totalClientes() {
    return this.http.get(`${this.url}total-clientes.php`);
  }

  eliminar(id) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }
  
}
