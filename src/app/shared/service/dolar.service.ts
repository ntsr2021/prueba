import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class DolarService {

	url = GlobalConstants.urlBase + 'dolar/';

  constructor(private http: HttpClient) { }


  consultarOne() {
    return this.http.get(`${this.url}consultarOne.php`);
  }
  editar(valor) {
    return this.http.get(`${this.url}editar.php?valor=${valor}`);
  }
}
