import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

declare var $:any;


@Injectable({
  providedIn: 'root'
})
export class BlogGuard implements CanActivate {
  

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }


  canDeactivate(): Observable<boolean> | boolean 
  {
    $('#inicio-navbar-fixed').css('position', 'fixed');
    $('#main').css('margin-top', '142px');

    return true;
  }


  
}
