import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { VendedorService } from '../../../../../shared/service/vendedor.service';
import { UserService } from '../../../../../shared/service/user.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {


  @ViewChild(MatSort, {static: true}) sort: MatSort; 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;
  columnas = null;
	vendedores = null;

  user = null;
  jwt = {
    token: window.localStorage.getItem('token')
  } 


  constructor(private vendedorService: VendedorService,
              private userService: UserService) { }


  ngOnInit(): void {
  	this.consUser();
  }


  consUser() {
    this.userService.consultar(this.jwt).subscribe(resp => 
    {
      this.user = resp;

      this.consTodos();
    })
  }


  consTodos()
  {
    this.vendedorService.consTodos().subscribe(resp => 
    {
      this.vendedores = resp;


      if(this.user.rol == 'a')
        this.columnas = ['nombre', 'apellido', 'ci', 'cargo', 'usuario', 'editar', 'eliminar'];
      else 
        this.columnas = ['nombre', 'apellido', 'ci', 'cargo', 'usuario'];
      

	    this.dataSource = new MatTableDataSource(this.vendedores); 
	    this.dataSource.sort = this.sort;
	    this.dataSource.paginator = this.paginator; 
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 


  eliminar(id_user)
  {
    alertify.confirm('Confirmar', '¿Estás seguro que deseas eliminar?',
      ()=> {
        this.vendedorService.eliminar(id_user).subscribe(resp => 
        {
          if(resp['mens'] == 'OK') 
          {
            alertify.success('Usuario eliminado');
            this.consTodos();
          }else 
            alertify.error('Ejecución fallida');
        });
      }, ()=>{});
  }


}