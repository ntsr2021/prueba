import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalConstants } from '../../config/global-constants';

@Injectable({
  providedIn: 'root'
})
export class NotificacionClienteService {

	url = GlobalConstants.urlBase + 'notificacion-cliente/';

  constructor(private http: HttpClient) { }


  consultar(id_user) {
  	return this.http.get(`${this.url}consultar.php?id_user=${id_user}`);
  }

  desactivar(id_user) {
    return this.http.get(`${this.url}desactivar.php?id_user=${id_user}`);
  }

}
