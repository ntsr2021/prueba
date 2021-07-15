import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class VendAdminGuard implements CanActivate {

	user = null;
	band : boolean;

	constructor(private userService: UserService) {}

  canActivate(): Observable<boolean> | boolean {
  
  	let token = window.localStorage.getItem('token');

  	this.userService.consultar(token).subscribe(resp => 
  	{
  		this.user = resp;

  		if(this.user.rol == 'a')
  			this.band = true;
  		else
  			this.band = false;
  	});

  	return this.band;
  }
  
}
