import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ReciboService {

	url = GlobalConstants.urlBase + 'recibo/';

  constructor(private http: HttpClient) { }

  registrar(datos) {
  	return this.http.post(`${this.url}registrar.php`, JSON.stringify(datos));
  }

  regisUsuarioActivo(id_tienda, id_user) { // Registra un pedido cuando el usuario ha iniado sesion
    return this.http.get(`${this.url}regis-usuario-activo.php?id_tienda=${id_tienda}&id_user=${id_user}`);
  }

  regisProducto(datos) {
  	return this.http.post(`${this.url}regis-producto.php`, JSON.stringify(datos));
  }

  consTodos(datos) {
    return this.http.post(`${this.url}cons-todos.php`, JSON.stringify(datos));
  }

  consUno(id) {
    return this.http.get(`${this.url}cons-uno.php?id=${id}`);
  }

  consProducto(id) {
    return this.http.get(`${this.url}cons-producto.php?id=${id}`);
  }

  checkear(id) {
    return this.http.get(`${this.url}checkear.php?id=${id}`);
  }

  checkDespachador(id) {
    return this.http.get(`${this.url}check-despachador.php?id=${id}`);
  }

  revertir(id) {
    return this.http.get(`${this.url}revertir.php?id=${id}`);
  }

  totalVentas() {
    return this.http.get(`${this.url}total-ventas.php`);
  }

  totalGanancia() {
    return this.http.get(`${this.url}total-ganancia.php`);
  }

  totalProdVendidos() {
    return this.http.get(`${this.url}total-prod-vendidos.php`);
  }

  asignar(id_vendedor, id_recibo) {
    return this.http.get(`${this.url}asignar.php?id_vendedor=${id_vendedor}&id_recibo=${id_recibo}`);
  }

  regCarroCompra(datos) {
    return this.http.post(`${this.url}reg-carro-compra.php`, JSON.stringify(datos));
  }

  elimCarroCompra(datos) {
    return this.http.post(`${this.url}elim-carro-compra.php`, JSON.stringify(datos));
  }

  consCliente(datos) {
    return this.http.post(`${this.url}cons-cliente.php`, JSON.stringify(datos));
  }

  consVendedor(id) {
    return this.http.get(`${this.url}cons-vendedor2.php?id=${id}`);
  }

  consDespachador() {
    return this.http.get(`${this.url}cons-despachador2.php`);
  }

  veriTiempoCarroCompra(datos) {
    return this.http.post(`${this.url}veri-tiempo-carro-compra.php`, JSON.stringify(datos));
  }

  totalPendientes() {
    return this.http.get(`${this.url}total-pendientes.php`);
  }
  
}