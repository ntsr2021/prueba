import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

	url = GlobalConstants.urlBase + 'archivo/';

  constructor(private http: HttpClient) { }

  subirTemp(datos) {
  	return this.http.post(`${this.url}subir-temp.php`, JSON.stringify(datos));
  }

  subir(datos) {
  	return this.http.post(`${this.url}subir.php`, JSON.stringify(datos));
  }

  editar(datos) {
  	return this.http.post(`${this.url}editar.php`, JSON.stringify(datos));
  }
}
