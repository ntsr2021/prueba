import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { UserService } from '../../../../shared/service/user.service';
import { ReciboService } from '../../../../shared/service/recibo.service';
import { ClienteService } from '../../../../shared/service/cliente.service';
import { DolarService } from '../../../../shared/service/dolar.service';
import { PuntoEntregaService } from '../../../../shared/service/punto-entrega.service';
import { FechaService } from '../../../../shared/service/fecha.service';

import { GenerarReciboComponent } from './../../../../shared/component/generar-recibo/generar-recibo.component';

import { FormatoMoneda } from './../../../../shared/helper/formato-moneda';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {


  @ViewChild(MatSort, {static: true}) sort: MatSort; 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;
  columnas : any;
	recibos = null;

  dataSourceTotal = null;
  columnasTotal = ['ventas', 'productos', 'gan_dol', 'gan_bs'];
  totales = [{
    ventas : 0,
    productos : 0,
    gan_dol : 0
  }];

  contNotific = null;
  notificClass = 'btn-secondary';

  user = null;
  jwt = {
    token: window.localStorage.getItem('token')
  }

  dolar = 0;

  @ViewChild('generar_recibo') generarReciboComponent: GenerarReciboComponent;

  entrega = {
    tipo: null,
    punto: null
  }
  puntosEntrega = null;

  fecActual = new Date();

  filtros = {
    tipo_entrega: 'pick_up',
    punto_entrega: null,
    fecha_inicial: '',
    fecha_final: ''
  }



  constructor(private reciboService: ReciboService,
              private userService : UserService,
              private clienteService: ClienteService,
              private dolarService: DolarService,
              private puntoEntregaService: PuntoEntregaService,
              private fechaService: FechaService,
              public formatoMoneda: FormatoMoneda,
              private router: Router) { }


  ngOnInit(): void 
  {
    // Establecer filtro guardado
    if(JSON.parse(localStorage.getItem('filtros_recibo')) != null)
    {
      this.filtros = JSON.parse(localStorage.getItem('filtros_recibo'));
    }else 
    {
      this.consFechaActual();
    }


  	this.consultar();
    
    this.consDolar();

    this.consPuntosEntrega();
  }


  consultar()
  {
    this.userService.consultar(this.jwt).subscribe(resp => 
    {
      this.user = resp;


      // Vaciar entrega.punto cuando entrega.tipo sea null
      if(this.filtros.tipo_entrega == null || this.filtros.tipo_entrega == '' || this.filtros.tipo_entrega == 'delivery')
        this.filtros.punto_entrega = null;


      let datos = {
        user : this.user, // Pasar id_user
        filtros : this.filtros 
      }


      this.reciboService.consTodos(datos).subscribe(resp =>
      {
        this.recibos = resp;


        if(this.user.rol == 'a' || this.user.rol == 's')
          this.columnas = ['codigo', 'cliente', 'ci', 'fecha', 'hora', 'asignacion', 'estatus', 'reporte', 'asig_vend', 'checkear', 'revertir'];
        else if(this.user.rol == 'v' || this.user.rol == 'd')
          this.columnas = ['codigo', 'cliente', 'ci', 'fecha', 'hora', 'estatus', 'reporte', 'checkear'];


        if(resp != null)
        {
          this.dataSource = new MatTableDataSource(this.recibos); 
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator; 
        }else 
        {
          this.dataSource = new MatTableDataSource(); 
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator; 
        }

        this.obtTotales();
      });

    })
  }


  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value; 
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 


  filtrarConsulta()
  {
    // Validar fechas
    let error = '';

    if(this.filtros.fecha_inicial == '' || this.filtros.fecha_final == '')
      error = 'La fecha inicial y la fecha final no deben estar vacias';
    else if(this.filtros.fecha_inicial > this.filtros.fecha_final)
      error = 'La fecha inicial no puede ser mayor a la fecha final';
    

    if(error == '')
    {
      localStorage.setItem('filtros_recibo', JSON.stringify(this.filtros));

      this.consultar();
    }
    else 
      alertify.alert('Alerta', error);
  }


 checkear(id_recibo)
  {
    if(this.user.rol != 'd')
    {
      this.reciboService.checkear(id_recibo).subscribe(resp => 
      {
        if(resp['mens'] == 'OK')
        {
          this.consultar();

          alertify.success('Recibo atendido');
        }
      });
    }else 
    {
      this.reciboService.checkDespachador(id_recibo).subscribe(resp => 
      {
        if(resp['mens'] == 'OK')
        {
          this.consultar();

          alertify.success('Recibo finalizado');
        }
      });
    }
  }

  revertir(id_recibo)
  {
    alertify.confirm('Confirmar' ,'¿Estás seguro(a) que deseas revertir?', ()=>
    {
      this.reciboService.revertir(id_recibo).subscribe(resp => 
      {
        if(resp['mens'] == 'OK')
        {
          this.consultar();
          alertify.success('Recibo revertido');
        }else 
          alertify.error('Ejecución fallida');
      });
    }, ()=>{});
  }


  // Consultar dolar 
  consDolar() {
    this.dolarService.consultarOne().subscribe(resp => this.dolar = parseFloat(resp['valor']) )
  }


  // Obtener totales
  obtTotales()
  {
    this.dolarService.consultarOne().subscribe(resp => 
    {
      this.totales[0].ventas = 0; 
      this.totales[0].gan_dol = 0; 
      this.totales[0].productos = 0; 


      if(this.recibos != null)
      {
        this.recibos.forEach(e => 
        {
          if(e.estatus == 'a' || e.estatus == 'f')
            ++this.totales[0].ventas;
          
          this.totales[0].gan_dol += parseFloat(e.monto);
          this.totales[0].productos += parseInt(e.productos);
        });
      }


      this.dataSourceTotal = new MatTableDataSource(this.totales); 
    })  
  }


  // Consultar puntos de entrega
  consPuntosEntrega()
  {
    this.puntoEntregaService.consTodos().subscribe(resp => this.puntosEntrega = resp )
  }

  // Consultar la fecha actual en la DB
  consFechaActual()
  {
    this.fechaService.consultar().subscribe(resp => 
    {
      this.filtros.fecha_inicial = resp['fecha'];
      this.filtros.fecha_final = resp['fecha'];
    })
  }


}