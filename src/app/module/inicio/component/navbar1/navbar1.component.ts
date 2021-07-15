import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

import { UserService } from '../../../../shared/service/user.service';
import { ClienteService } from '../../../../shared/service/cliente.service';

import { GlobalConstants } from '../../../../config/global-constants';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-navbar1',
  templateUrl: './navbar1.component.html',
  styleUrls: ['./navbar1.component.css']
})

export class Navbar1Component implements OnInit {

  user: any = false;
  jwt = {
    token: null
  }
  cliente = null;

  prodCarro: any = JSON.parse(window.localStorage.getItem('prodCarro'));
  busquedad = null;

  redir = null;
  


  constructor(private userService: UserService,
              private clienteService: ClienteService,
              private router: Router) { }

  ngOnInit() {
  	this.consUser();
  }


  consUser() 
  {
  	this.jwt.token = localStorage.getItem('tokenCliente');

  	if(this.jwt.token != null && this.jwt.token != undefined)
    {
  		this.userService.consultar(this.jwt).subscribe(resp => 
      {
        this.user = resp;


        // Mostrar cantidad de productos agregados solo si el usuario esta logueado o se han agregado productos
        if(this.prodCarro != null && this.user != null)
        {
          $('#carro-icon-cont').text(this.cantProdCarro());
        }

        this.clienteService.consUno(this.user.id_user).subscribe(resp => 
        {
          this.cliente = resp;
        }) 
        
      })
    }else
      this.user = null;
  }


  salir()
  {
  	this.userService.cerrarSesionCliente();
  	location.href = GlobalConstants.site;
  }


  buscar() 
  {  
    
    // Busca 800ms despues de escribir para evitar sobrecarga de ajax

    if(this.redir != null)
      clearTimeout(this.redir);


    this.redir = setTimeout(()=> 
    {
      if(this.busquedad != '' && this.busquedad != null)
        this.router.navigate(['buscar/'+this.busquedad]);
      else 
        this.router.navigate(['']);

    }, 1000);

  }



  cantProdCarro()
  {
    let cantidad = 0;
    this.prodCarro.forEach(e => cantidad += e.can_comprar )

    return cantidad;
  }

}
