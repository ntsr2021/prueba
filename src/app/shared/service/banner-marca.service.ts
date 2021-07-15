import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class BannerMarcaService {

	url = GlobalConstants.urlBase + 'banner-marca/';

  constructor(private http: HttpClient) { }


  consTodos() {
  	return this.http.get(`${this.url}cons-todos.php`);
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

  eliminar(id){
  	return this.http.get(`${this.url}eliminar.php?id=${id}`);
  }

  moverDerecha(id){
    return this.http.get(`${this.url}mover-derecha.php?id=${id}`);
  }

  moverIzquierda(id){
    return this.http.get(`${this.url}mover-izquierda.php?id=${id}`);
  }

}
