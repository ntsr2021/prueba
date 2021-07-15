import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from "@angular/router";

import { DolarService } from '../../../../shared/service/dolar.service';
import { UserService } from '../../../../shared/service/user.service';
import { ReciboService } from '../../../../shared/service/recibo.service';
import { ProductoService } from '../../../../shared/service/producto.service';

import { FormatoMoneda } from '../../../../shared/helper/formato-moneda';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent implements OnInit 
{


	@ViewChild(MatSort, {static: true}) sort: MatSort; 
	dataSource = null;
	columnas = ['foto', 'codigo', 'nombre', 'precio_dol', 'precio_bs', 'cantidad', 'consultar', 'eliminar'];

  prodCarro = JSON.parse(localStorage.getItem('prodCarro'));
  
  dolar = null;

  user = null;
  jwt = {
    token: null
  }



  constructor(private dolarService: DolarService,
              private userService: UserService,
              private router : Router,
              private reciboService: ReciboService,
              private productoService: ProductoService,
              public formatoMoneda: FormatoMoneda) { }



  ngOnInit(): void {
    this.consUser();
    this.consDolar();
  	this.consProdCarro();
  }


  consUser()
  {
    this.jwt.token = localStorage.getItem('tokenCliente');
    if(this.jwt.token != null && this.jwt.token != undefined)
    {
      this.userService.consultar(this.jwt).subscribe(resp => {
        this.user = resp;
      })
    }
  }


  consDolar() {
    this.dolarService.consultarOne().subscribe(resp => this.dolar = parseFloat(resp['valor']) )
  }


  consProdCarro()
  {
    if(this.prodCarro != null)
    {
      this.dataSource = new MatTableDataSource(this.prodCarro); 
      this.dataSource.sort = this.sort;
    } else 
    {
      this.dataSource = new MatTableDataSource(); 
      this.dataSource.sort = this.sort;
    }
  }


  aumentar(pro)
  {
    if(pro.can_comprar < pro.can_original) // Cantidad limite por aumentar del producto
    {
      let ind = this.hubicarIndProd(pro.codigo);


      ++this.prodCarro[ind].can_comprar;
      $('#carro-icon-cont').text(this.cantProdCarro());
      localStorage.setItem('prodCarro', JSON.stringify(this.prodCarro));
    }
  }


  disminuir(pro)
  {
    if(pro.can_comprar > 1) // Cantidad limite por reducir del producto
    {
      let ind = this.hubicarIndProd(pro.codigo);


      --this.prodCarro[ind].can_comprar;
      $('#carro-icon-cont').text(this.cantProdCarro());
      localStorage.setItem('prodCarro', JSON.stringify(this.prodCarro));
    }
  }


  vaciar() 
  {
    localStorage.setItem('prodCarro', JSON.stringify(null));
    this.prodCarro = JSON.parse(localStorage.getItem('prodCarro'));
    

    $('#carro-icon-cont').hide();
    $('#carro-icon-cont').text('');


    this.consProdCarro();
  }


  eliminar(pro)
  {
    let ind = this.hubicarIndProd(pro.codigo);
    this.prodCarro.splice(ind, 1); // Elimina producto
    
    if(this.prodCarro == '')
      this.prodCarro = null;    


    localStorage.setItem('prodCarro', JSON.stringify(this.prodCarro)); // Modificar prodCarro del localStorage
    

    // Setear cantidad al carro de compra
    if(this.prodCarro == null) 
    {
      $('#carro-icon-cont').hide();
      $('#carro-icon-cont').text('');
    }else 
      $('#carro-icon-cont').text(this.cantProdCarro());


    this.consProdCarro();
  }



  totalBs()
  {
    if(this.prodCarro == null)
      return 0.00;
    else 
    {
      let total = 0;

      this.prodCarro.forEach(e=> {
        total += parseFloat(e.precio)*e.can_comprar;
      });

      return (total*this.dolar).toFixed(2);
    }
  }

  total$()
  {
    if(this.prodCarro == null)
      return 0.00;
    else 
    {
      let total = 0;

      this.prodCarro.forEach(e=> {
        total += parseFloat(e.precio)*e.can_comprar;
      });

      return total.toFixed(2);
    }
  }


  procesar()
  {
    if(this.user == null) // Si el user no esta logeado
    {
      this.router.navigate(['/../../cuenta']);
    }


    else if(this.prodCarro != null) // Si el carro compra no esta vacio
    {

      let datos = {
        id_user : this.user.id_user,
        carroCompra: this.prodCarro
      }

      this.productoService.veriActualizacionInventario(datos).subscribe(resp => 
      {

        if(resp['veriActualizacion'] == true) // Verifica si el inventario ha cambiado
        {
          this.prodCarro = resp['carroCompraNuevo'];


          localStorage.setItem('prodCarro', JSON.stringify(this.prodCarro));


          // Setear cantidad al carro de compra
          if(this.prodCarro == null) 
          {
            $('#carro-icon-cont').hide();
            $('#carro-icon-cont').text('');
          }else 
            $('#carro-icon-cont').text(this.cantProdCarro());



          alertify.alert('Alerta', 'La disponibilidad de productos ha cambiado. Verifique su carrito de compra y vuelva a procesar.');


          this.consProdCarro();
          
        }

        else // Si el inventario no ha cambiado continua la compra
        {
          let carroCompra = {
            token: this.jwt.token,
            productos: this.prodCarro
          }

          this.reciboService.regCarroCompra(carroCompra).subscribe();

          this.router.navigate(['pago']);
        }

      });
    }


    else // Si el carro de compra esta vacio
    {
      alertify.alert('Alerta', 'Debe haber al menos un producto agregado para poder procesar la compra');
    }
  }


  // Hubicar ind del producto indicado en localStorage
  hubicarIndProd(codigo)
  {  
    let ind = null;

    this.prodCarro.forEach((e, i) => 
    {
      if(e.codigo == codigo)
        ind = i;
    });
    
    return ind;
  }


  // Retornar cantidad de productos del carro de compra
  cantProdCarro()
  {
    let cantidad = 0;
    this.prodCarro.forEach(e => cantidad += e.can_comprar )

    return cantidad;
  }

}