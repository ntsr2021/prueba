import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { PuntoEntregaService } from '../../../../shared/service/punto-entrega.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-punto-entrega',
  templateUrl: './punto-entrega.component.html',
  styleUrls: ['./punto-entrega.component.css']
})
export class PuntoEntregaComponent implements OnInit {


  @ViewChild(MatSort, {static: true}) sort: MatSort; 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;
  columnas = ['nombre', 'direccion', 'editar', 'eliminar'];
	puntos = null;



  constructor(private puntoEntregaService: PuntoEntregaService) { }


  ngOnInit(): void {
  	this.consTodos()
  }


  consTodos()
  {
    this.puntoEntregaService.consTodos().subscribe(resp => 
    {
      this.puntos = resp;


	    this.dataSource = new MatTableDataSource(this.puntos); 
	    this.dataSource.sort = this.sort;
	    this.dataSource.paginator = this.paginator; 
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 


  eliminar(id_punto_entrega)
  {
    alertify.confirm('Confirmar', '¿Estás seguro que deseas eliminar?',
      ()=> {
        this.puntoEntregaService.eliminar(id_punto_entrega).subscribe(resp => 
        {
          if(resp['mens'] == 'OK') 
          {
            alertify.success('Punto de entrega eliminado');
            this.consTodos();
          }else 
            alertify.error('Ejecución fallida');
        });
      }, ()=>{});
  }


}