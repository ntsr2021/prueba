import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  url = GlobalConstants.urlBase + 'blog/';
 

  constructor(private http: HttpClient){ }


  registrar(datos) {
  	return this.http.post(`${this.url}registrar.php`, JSON.stringify(datos));
  }

  editar(datos) {
    return this.http.post(`${this.url}editar.php`, JSON.stringify(datos));
  }


  consTodos() {
    return this.http.get(`${this.url}cons-todos.php`);
  }

  consUno(id) {
    return this.http.get(`${this.url}cons-uno.php?id=${id}`);
  }

  consComentarios(id) {
    return this.http.get(`${this.url}cons-comentarios.php?id=${id}`);
  }

  consBuscador(datos) {
    return this.http.post(`${this.url}cons-buscador.php`, JSON.stringify(datos));
  }

  consUnComentario(id) {
    return this.http.get(`${this.url}cons-un-comentario.php?id=${id}`);
  }


  eliminar(id) {
    return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }


  comentar(datos) {
    return this.http.post(`${this.url}comentar.php`, JSON.stringify(datos));
  }

  consTotalComent(id) {
    return this.http.get(`${this.url}total-comentarios-articulo.php?id=${id}`);
  }


  eliminarComentario(id) {
    return this.http.get(`${this.url}eliminar-comentario.php?id=${id}`);
  }


  totalComentariosSinVer() {
    return this.http.get(`${this.url}total-comentarios-sin-ver.php`);
  }

  actualizarComentNoVistos(id) {
    return this.http.get(`${this.url}actualizar-coment-no-vistos.php?id=${id}`);
  }

  subirImg(datos) {
    return this.http.post(`${this.url}subir-img.php`, JSON.stringify(datos));
  }

}
