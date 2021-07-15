import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class HorarioCierreService {

	url = GlobalConstants.urlBase + 'horario-cierre/';

  constructor(private http: HttpClient) { }


  consultar() {
  	return this.http.get(`${this.url}consultar.php`);
  }

  guardar(datos) {
  	return this.http.post(`${this.url}guardar.php`, JSON.stringify(datos));
  }

  obt

}