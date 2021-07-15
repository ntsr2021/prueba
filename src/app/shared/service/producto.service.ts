import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = GlobalConstants.urlBase + 'producto/';
 

  constructor(private http: HttpClient){ }


  consultar() {
  	return this.http.get(`${this.url}consultar.php`);
  }

  consUno(id_producto) {
    return this.http.get(`${this.url}cons-uno.php?id_producto=${id_producto}`);
  }

  registrar(datos) {
  	return this.http.post(`${this.url}registrar.php`, JSON.stringify(datos));
  }

  editar(datos) {
    return this.http.post(`${this.url}editar.php`, JSON.stringify(datos));
  }

  consultarPocos() {
    return this.http.get(`${this.url}consultarPocos.php`);
  }
  consultarTodos(idcategoria) {
    return this.http.get(`${this.url}consultarTodos.php?idcategoria=${idcategoria}`);
  }


  consCliente(idcategoria) {
    return this.http.get(`${this.url}consul-cliente.php?idcategoria=${idcategoria}`);
  }

  consBusquedad(busq, limit1) {
    return this.http.get(`${this.url}cons-busquedad.php?busq=${busq}&limit1=${limit1}`);
  }

  consTodos(datos) {
    return this.http.post(`${this.url}cons-todos.php`, JSON.stringify(datos));
  }

  consPromociones(limit1) {
    return this.http.get(`${this.url}cons-promociones.php?limit1=${limit1}`);
  }

  consMasVendidos(limit1) {
    return this.http.get(`${this.url}cons-mas-vendidos.php?limit1=${limit1}`);
  }

  consRecientes(limit1) {
    return this.http.get(`${this.url}cons-recientes.php?limit1=${limit1}`);
  }

  consPorCategoria(datos) {
    return this.http.post(`${this.url}cons-por-categoria.php`, JSON.stringify(datos));
  }


  consPorDepartamento(limit1) {
    return this.http.get(`${this.url}cons-por-departamento.php?limit1=${limit1}`);
  }


  consRelacionados(id) {
    return this.http.get(`${this.url}cons-relacionados.php?id=${id}`);
  }


  eliminar(id) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }

  ocultar(id) {
    return this.http.get(`${this.url}ocultar.php?id=${id}`);
  }

  totales(id) {
    return this.http.get(`${this.url}totales.php?id=${id}`);
  }

  hayPromocion() {
    return this.http.get(`${this.url}hay-promocion.php`);
  }

  cancelarPromocion() {
    return this.http.get(`${this.url}cancelar-promocion.php`);
  }

  veriActualizacionInventario(datos) {
    return this.http.post(`${this.url}veri-actualizacion-inventario.php`, JSON.stringify(datos));
  }

}
