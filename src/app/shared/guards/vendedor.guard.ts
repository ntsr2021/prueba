import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from './../service/user.service';
import { GlobalConstants } from '../../config/global-constants';
import { ajax } from '../helper/ajax';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class VendedorGuard implements CanActivate {

	jwt = {
		token : null
	}
	user = null;
	url = GlobalConstants.urlBase + 'user/';


	constructor(private router: Router,
							private userService: UserService) {}

  canActivate(): Observable<boolean> | boolean 
  {
   	let band : boolean = false;
  	this.jwt.token = window.localStorage.getItem('token');

  	if(this.jwt.token != null) 
  	{
			this.consUser();


  		if(this.user != null)
  			band = true;
  		else
  			band = false;

		}else 
			band = false;


    if(!band)
      this.router.navigate(['']);

		return band;
  }


  consUser() {
  	ajax(`${this.url}consultar.php`, this.jwt, resp => {
      this.user = JSON.parse(resp);
    });
  }
}


