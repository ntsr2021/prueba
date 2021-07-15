import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

	url = GlobalConstants.urlBase + 'fecha/';

  constructor(private http: HttpClient) { }

  consultar() {
    return this.http.get(`${this.url}consultar.php`);
  }
}
