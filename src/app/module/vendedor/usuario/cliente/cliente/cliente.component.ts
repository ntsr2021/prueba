import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ClienteService } from '../../../../../shared/service/cliente.service';
import { UserService } from '../../../../../shared/service/user.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {


  @ViewChild(MatSort, {static: true}) sort: MatSort; 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;
  columnas = null;
	clientes = null;

	cliente = null;

  busquedad = '';

  user = null;
  jwt = {
    token: window.localStorage.getItem('token')
  } 


  constructor(private clienteService: ClienteService,
              private userService: UserService) { }


  ngOnInit(): void {
    this.consUser();
  }


  consUser() {
    this.userService.consultar(this.jwt).subscribe(resp => 
    {
      this.user = resp;

      this.consultar();
    })
  }

  consultar()
  {
    if(this.user.rol == 'v')
    {
      this.clienteService.consVendedor(this.user.id_user, this.busquedad).subscribe(resp => 
      {
        this.clientes = resp;

        this.columnas = ['ci', 'nombre', 'apellido', 'telefono', 'correo', 'consultar'];


        if(this.clientes != null)
        {
          this.dataSource = new MatTableDataSource(this.clientes); 
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }else 
        {
          this.dataSource = new MatTableDataSource(); 
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
        
      });
    }else 
    {
      this.clienteService.consTodo(this.busquedad).subscribe(resp => 
      {
        this.clientes = resp;

        if(this.user.rol == 'a')
          this.columnas = ['ci', 'nombre', 'apellido', 'telefono', 'correo', 'consultar', 'eliminar'];
        else if(this.user.rol == 's')
          this.columnas = ['ci', 'nombre', 'apellido', 'telefono', 'correo', 'consultar'];


        if(this.clientes != null)
        {
          this.dataSource = new MatTableDataSource(this.clientes); 
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator; 
        }else 
        {
          this.dataSource = new MatTableDataSource(); 
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator; 
        }

      });
    }
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 


  eliminar(id_user)
  {
    alertify.confirm('Confirmar', '¿Estás seguro(a) que deseas eliminar?, esta acción eliminara los recibos de compra correspondientes a este cliente.',
      ()=> {
        this.clienteService.eliminar(id_user).subscribe(resp => 
        {
          if(resp['mens'] == 'OK') 
          {
            alertify.success('Cliente eliminado');
            this.consultar();
          }else 
            alertify.error('Ejecución fallida');
        });
      }, ()=>{});
  }



}