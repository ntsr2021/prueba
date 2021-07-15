import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class BannerPrincipalService {

	url = GlobalConstants.urlBase + 'banner-principal/';

  constructor(private http: HttpClient) { }


  consTodos() {
  	return this.http.get(`${this.url}cons-todos.php`);
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

  subirPosicion(id){
    return this.http.get(`${this.url}subir-posicion.php?id=${id}`);
  }

  bajarPosicion(id){
    return this.http.get(`${this.url}bajar-posicion.php?id=${id}`);
  }
}
