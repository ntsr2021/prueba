import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	url = GlobalConstants.urlBase + 'user/';


  constructor(private http: HttpClient) { }

  acceder(datos) {
    return this.http.post(`${this.url}acceder.php`, JSON.stringify(datos));
  }

  accederCliente(datos) {
    return this.http.post(`${this.url}acceder-cliente.php`, JSON.stringify(datos));
  }
  
  cerrarSesionAdministrativa() {
    window.localStorage.removeItem('token');
  }

  cerrarSesionCliente() {
    window.localStorage.removeItem('tokenCliente');
  }

  consultar(datos){
  	return this.http.post(`${this.url}consultar.php`, JSON.stringify(datos));
  }

  seguridadCliente(datos) {
    return this.http.post(`${this.url}seguridad-cliente.php`, JSON.stringify(datos));
  }

  seguridad(datos) {
    return this.http.post(`${this.url}seguridad.php`, JSON.stringify(datos));
  }

  recuperar(datos) {
    return this.http.post(`${this.url}recuperar.php`, JSON.stringify(datos))
  }
}
