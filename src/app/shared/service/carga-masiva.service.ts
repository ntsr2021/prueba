import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class CargaMasivaService {

	url = GlobalConstants.urlBase + 'carga-masiva/';


  constructor(private http: HttpClient) { }

  subirData(data) {
  	return this.http.post(`${this.url}subir-data.php`, JSON.stringify(data));
  }

  cargarDatos() {
  	return this.http.get(`${this.url}cargar-datos.php`);
  }


}
