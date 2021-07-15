import { Component, OnInit } from '@angular/core';

import { ReciboService } from '../../service/recibo.service';

import { FormatoMoneda } from '../../helper/formato-moneda';

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-generar-recibo',
  templateUrl: './generar-recibo.component.html',
  styleUrls: ['./generar-recibo.component.css']
})
export class GenerarReciboComponent implements OnInit {

	recibo = null;
  productos = null;
  pagos = null;
  pdf = null;


  constructor(private reciboService: ReciboService,
              private formatoMoneda: FormatoMoneda) { }


  ngOnInit(): void {
  }


  generarRecibo(id_recibo)
  {
    this.pdf = new jsPDF();

    this.reciboService.consUno(id_recibo).subscribe(resp => 
    {
      this.recibo = resp['datos'];

      this.recibo.tasa_dolar = parseFloat(this.recibo.tasa_dolar);

      this.productos = resp['productos'];
      this.pagos = resp['pagos'];

      if(this.pagos.length == 2)
      {
        this.pagos[0].monto = parseFloat(this.pagos[0].monto);
        this.pagos[1].monto = parseFloat(this.pagos[1].monto);
      }

      let text = '';
      let j:number;

      let h: number = 56;

      // MEMBRETE
      // Logo
      this.pdf.addImage('assets/img/logo1.png', 'PNG', 15, 15, 30, 18); 


      // Titulo del recibo
      this.pdf.setFontSize(14);
      this.pdf.setFont(undefined, 'bold');
      text = 'RECIBO DE COMPRA';
      this.pdf.text(text, this.centro(text), 20);


      // Dirección de la pagina
      this.pdf.setFontSize(10);
      this.pdf.setFont(undefined, 'bold');
      text = 'WWW.NTSSTORE.COM';
      this.pdf.text(text, this.centro(text), 28);

      // RIF de la pagina
      this.pdf.setFont(undefined, 'bold');
      text = 'R.I.F.: J-50058410-5';
      this.pdf.text(text, this.centro(text), 36);


      // Codigo del ticket
      this.pdf.setFontSize(12);
      this.pdf.setFont(undefined, 'normal');
      this.pdf.text('CODIGO: ', 156, 20);
      this.pdf.setFont(undefined, 'bold');
      this.pdf.text(this.recibo.codigo, 181, 20);


      this.pdf.setFontSize(10); // Letra normal


      // Fecha de solicitud
      this.pdf.setFont(undefined, 'normal');
      this.pdf.text('FECHA: ', 161, 28);
      this.pdf.setFont(undefined, 'bold');
      this.pdf.text(this.recibo.fecha, 177, 28);

      // Hora de solicitud
      this.pdf.setFont(undefined, 'normal');
      this.pdf.text('HORA: ', 163, 36);
      this.pdf.setFont(undefined, 'bold');
      this.pdf.text(this.recibo.hora, 181, 36);


      /////////////////////////////////////////////////



      // CLIENTE
      // Tiutulo cliente
      this.pdf.setFontSize(12);
      this.pdf.setFont(undefined, 'bold');
      this.pdf.text('CLIENTE', 15, h);
      h+=8;

      this.pdf.setFontSize(10); // Letra normal

      
      // Nombre y apellido del cliente
      this.pdf.setFont(undefined, 'normal');
      this.pdf.text('NOMBRE: ', 15, h);
      this.pdf.setFont(undefined, 'bold');
      this.pdf.text(this.recibo.nombre.toUpperCase() + ' ' + this.recibo.apellido.toUpperCase(), 55, h);
      h+=8;

      // C.I.
      this.pdf.setFont(undefined, 'normal');
      this.pdf.text('DOCUMENTO: ', 15, h);
      this.pdf.setFont(undefined, 'bold');
      this.pdf.text(this.recibo.tipo_doc.toUpperCase() +'-'+ this.recibo.doc, 55, h);
      h+=8;

      // Teléfono
      this.pdf.setFont(undefined, 'normal');
      this.pdf.text('TELEFONO: ', 15, h);
      this.pdf.setFont(undefined, 'bold');
      this.pdf.text(this.recibo.telefono, 55, h);
      h+=8;

      // Correo
      this.pdf.setFont(undefined, 'normal');
      this.pdf.text('CORREO: ', 15, h);
      this.pdf.setFont(undefined, 'bold');
      this.pdf.text(this.recibo.correo.toUpperCase(), 55, h);
      h+=8;

      // Dirección
      this.pdf.setFont(undefined, 'normal');
      this.pdf.text('DIRECCION: ', 15, h);
      this.pdf.setFont(undefined, 'bold');
      


      // Imprime direccion como multilinea, luego de este punto todos los textos deben estar debajo a partir del valor de 'j'.
      text = this.pdf.splitTextToSize(this.recibo.direccion.toUpperCase(), 100); // Recibe cadena de texto cortada a una distancia especifica
      for(let i=0; i<text.length; i++) {
        this.pdf.text(text[i], 55, h);
        h += 8;
      }
      /////////////////////////////////////////////////
      
      h+=8;

      // ENTREGA

      // Titulo entrega
      this.pdf.setFontSize(12);
      this.pdf.setFont(undefined, 'bold');
      this.pdf.text('ENTREGA', 15, h);
      h+=8;

      this.pdf.setFontSize(10); // Letra normal

      if(this.recibo.tipo == 'pick_up')
      {
        // Entrega Pick Up
        this.pdf.setFont(undefined, 'normal');
        this.pdf.text('TIPO DE ENTREGA: ', 15, h);
        this.pdf.setFont(undefined, 'bold');
        this.pdf.text('PICK UP', 55, h);
        h += 8;

        // Punto de entrega
        this.pdf.setFont(undefined, 'normal');
        this.pdf.text('PUNTO DE ENTREGA: ', 15, h);
        this.pdf.setFont(undefined, 'bold');
        text = this.pdf.splitTextToSize(this.recibo.punto_entrega.toUpperCase(), 100); 
        for(let i=0; i<text.length; i++) {
          this.pdf.text(text[i], 55, h);
          h += 8;
        }
      }else 
      {
        // Entrega Delivery
        this.pdf.setFont(undefined, 'normal');
        this.pdf.text('TIPO DE ENTREGA: ', 15, h);
        this.pdf.setFont(undefined, 'bold');
        this.pdf.text('DELIVERY', 55, h);
        h += 8;
      }


      /////////////////////////////////////////////////
      h+=8;


      // PAGO

      if(this.pagos.length == 1) // Pago unico
      {

        // Titulo pago
        this.pdf.setFontSize(12);
        this.pdf.setFont(undefined, 'bold');
        this.pdf.text('PAGO', 15, h);
        h+=8;

        this.pdf.setFontSize(10); // Letra normal


        // Tasa del dolar registrada
        this.pdf.setFont(undefined, 'normal');
        this.pdf.text('TASA DEL DOLAR: ', 15, h);
        this.pdf.setFont(undefined, 'bold');
        this.pdf.text('BS. ' + this.formatoMoneda.setFormato(this.recibo.tasa_dolar.toFixed(2)), 55, h);

        h += 12;

         
        // Definir el tipo de pago realizado
        if(this.pagos[0].forma_pago == 'tran_dol' || this.pagos[0].forma_pago == 'tran_bs' || this.pagos[0].forma_pago == 'pago_movil')
        {
          // Tipo de pago
          if(this.pagos[0].forma_pago == 'tran_dol')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('TRANSFERENCIA EN DOLARES', 55, h);
            h+=8;
          }
          else if(this.pagos[0].forma_pago == 'tran_bs')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('TRANSFERENCIA EN BOLIVARES', 55, h);
            h+=8;
          }else 
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('PAGO MOVIL', 55, h);
            h+=8;
          }
          

          // Monto cancelado
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('MONTO CANCELADO: ', 15, h);

          this.pdf.setFont(undefined, 'bold');

          if(this.pagos[0].forma_pago == 'tran_dol')
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.total$()), 55, h);
          else 
            this.pdf.text('Bs ' + this.formatoMoneda.setFormato(this.totalBs()), 55, h);
          
          h+=8;


          // Nombre del titular
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('TITULAR: ', 15, h);
          this.pdf.setFont(undefined, 'bold');
          this.pdf.text(this.pagos[0].nombre_titular.toUpperCase(), 55, h);
          h+=8;

          // C.I. Titular
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('DOCUMENTO: ', 15, h);
          this.pdf.setFont(undefined, 'bold');
          this.pdf.text(this.pagos[0].tipo_doc_titular.toUpperCase() +'-'+ this.pagos[0].doc_titular, 55, h);
          h+=8;

          // Codigo de referencia
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('REFERENCIA: ', 15, h);
          this.pdf.setFont(undefined, 'bold');
          this.pdf.text(this.pagos[0].referencia, 55, h);

          h += 8;

        }else 
        {

          // Gift Card
          if(this.pagos[0].forma_pago == 'gift_card')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('GIFT CARD', 55, h);
            h+=8;


            // Monto cancelado
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('MONTO CANCELADO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.total$()), 55, h);
            h+=8;


            // Codigo de la gift card
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('CODIGO GIFT CARD: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text(this.pagos[0].referencia.toUpperCase(), 55, h);
            h+=8;
          }



          // PAYPAL
          else if(this.pagos[0].forma_pago == 'paypal')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('PAYPAL', 55, h);
            h+=8;


            // Monto cancelado
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('MONTO CANCELADO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.total$()), 55, h);
            h+=8;


            // referencia
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('REFERENCIA: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text(this.pagos[0].referencia.toUpperCase(), 55, h);
            h+=8;
          }



          // Pago en divisa
          else 
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('DIVISA', 55, h);
            h+=8;


            // Monto cancelado
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('MONTO CANCELADO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.total$()), 55, h);
            h+=8;


            // Descripcion del billete
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('DESCRIPCION: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            text = this.pdf.splitTextToSize(this.pagos[0].descripcion_billete.toUpperCase(), 100); 
            for(let i=0; i<text.length; i++) {
              this.pdf.text(text[i], 55, h);
              h += 8;
            }
          }
        }

      }

      else // Pago mixto
      {
        // Titulo pago
        this.pdf.setFontSize(12);
        this.pdf.setFont(undefined, 'bold');
        this.pdf.text('PAGO (MIXTO)', 15, h);
        
        this.pdf.setFontSize(10); // Letra normal

        h += 8;


        // Tasa del dolar registrada
        this.pdf.setFont(undefined, 'normal');
        this.pdf.text('TASA DEL DOLAR: ', 15, h);
        this.pdf.setFont(undefined, 'bold');
        this.pdf.text('BS. ' + this.formatoMoneda.setFormato(this.recibo.tasa_dolar.toFixed(2)), 55, h);

        h+=12;


        // Primer metodo de pago 
        this.pdf.text('PRIMER METODO DE PAGO', 15, h);

        h += 8;

         
        // Definir el tipo de pago realizado
        if(this.pagos[0].forma_pago == 'tran_dol' || this.pagos[0].forma_pago == 'tran_bs' || this.pagos[0].forma_pago == 'pago_movil')
        {
          // Tipo de pago
          if(this.pagos[0].forma_pago == 'tran_dol')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('TRANSFERENCIA EN DOLARES', 55, h);
            h+=8;
          }
          else if(this.pagos[0].forma_pago == 'tran_bs')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('TRANSFERENCIA EN BOLIVARES', 55, h);
            h+=8;
          }else 
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('PAGO MOVIL', 55, h);
            h+=8;
          }


          // Monto cancelado
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('MONTO CANCELADO: ', 15, h);

          this.pdf.setFont(undefined, 'bold');

          if(this.pagos[0].forma_pago == 'tran_dol')
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.pagos[0].monto.toFixed(2)), 55, h);
          else 
            this.pdf.text('Bs ' + this.formatoMoneda.setFormato(this.pagos[0].monto.toFixed(2)), 55, h);
        
          h+=8;
          

          // Nombre del titular
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('TITULAR: ', 15, h);
          this.pdf.setFont(undefined, 'bold');
          this.pdf.text(this.pagos[0].nombre_titular.toUpperCase(), 55, h);
          h+=8;

          // C.I. Titular
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('DOCUMENTO: ', 15, h);
          this.pdf.setFont(undefined, 'bold');
          this.pdf.text(this.pagos[0].tipo_doc_titular.toUpperCase() +'-'+ this.pagos[0].doc_titular, 55, h);
          h+=8;

          // Codigo de referencia
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('REFERENCIA: ', 15, h);
          this.pdf.setFont(undefined, 'bold');
          this.pdf.text(this.pagos[0].referencia, 55, h);

          h += 8;

        }else 
        {

          // Gift Card
          if(this.pagos[0].forma_pago == 'gift_card')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('GIFT CARD', 55, h);
            h+=8;


            // Monto cancelado
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('MONTO CANCELADO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.total$()), 55, h);
            h+=8;


            // Codigo de la gift card
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('CODIGO GIFT CARD: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text(this.pagos[0].referencia.toUpperCase(), 55, h);
            h+=8;
          }


          // PAYPAL
          else if(this.pagos[0].forma_pago == 'paypal')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('PAYPAL', 55, h);
            h+=8;


            // Monto cancelado
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('MONTO CANCELADO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.pagos[0].monto.toFixed(2)), 55, h);
            h+=8;


            // referencia 
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('REFERENCIA: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text(this.pagos[0].referencia.toUpperCase(), 55, h);
            h+=8;
          }


          // Pago en divisa
          else 
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('DIVISA', 55, h);
            h+=8;

            // Monto cancelado
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('MONTO CANCELADO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.pagos[0].monto.toFixed(2)), 55, h);
            h+=8;

            // Descripcion del billete
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('DESCRIPCION: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            text = this.pdf.splitTextToSize(this.pagos[0].descripcion_billete.toUpperCase(), 100); 
            for(let i=0; i<text.length; i++) {
              this.pdf.text(text[i], 55, h);
              h += 8;
            }
          }
          
        }
        h += 6;



        // Segundo metodo de pago 
        this.pdf.text('SEGUNDO METODO DE PAGO', 15, h);

        h += 8;


        this.pdf.setFontSize(10); // Letra normal

         
        // Definir el tipo de pago realizado
        if(this.pagos[1].forma_pago == 'tran_dol' || this.pagos[1].forma_pago == 'tran_bs' || this.pagos[1].forma_pago == 'pago_movil')
        {
          // Tipo de pago
          if(this.pagos[1].forma_pago == 'tran_dol')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('TRANSFERENCIA EN DOLARES', 55, h);
            h+=8;
          }
          else if(this.pagos[1].forma_pago == 'tran_bs')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('TRANSFERENCIA EN BOLIVARES', 55, h);
            h+=8;
          }else 
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('PAGO MOVIL', 55, h);
            h+=8;
          }


          // Monto cancelado
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('MONTO CANCELADO: ', 15, h);

          this.pdf.setFont(undefined, 'bold');

          if(this.pagos[1].forma_pago == 'tran_dol')
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.pagos[1].monto.toFixed(2)), 55, h);
          else 
            this.pdf.text('Bs ' + this.formatoMoneda.setFormato(this.pagos[1].monto.toFixed(2)), 55, h);
        
          h+=8;
          

          // Nombre del titular
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('TITULAR: ', 15, h);
          this.pdf.setFont(undefined, 'bold');
          this.pdf.text(this.pagos[1].nombre_titular.toUpperCase(), 55, h);
          h+=8;

          // C.I. Titular
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('DOCUMENTO: ', 15, h);
          this.pdf.setFont(undefined, 'bold');
          this.pdf.text(this.pagos[1].tipo_doc_titular.toUpperCase() +'-'+ this.pagos[1].doc_titular, 55, h);
          h+=8;

          // Codigo de referencia
          this.pdf.setFont(undefined, 'normal');
          this.pdf.text('REFERENCIA: ', 15, h);
          this.pdf.setFont(undefined, 'bold');
          this.pdf.text(this.pagos[1].referencia, 55, h);
          h+=8;
          
        }else 
        {


          // Gift Card
          if(this.pagos[1].forma_pago == 'gift_card')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('GIFT CARD', 55, h);
            h+=8;


            // Monto cancelado
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('MONTO CANCELADO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.total$()), 55, h);
            h+=8;


            // Codigo de la gift card
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('CODIGO GIFT CARD: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text(this.pagos[1].referencia.toUpperCase(), 55, h);
            h+=8;
          }


          // PAYPAL
          else if(this.pagos[1].forma_pago == 'paypal')
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('PAYPAL', 55, h);
            h+=8;


            // Monto cancelado
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('MONTO CANCELADO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.pagos[1].monto.toFixed(2)), 55, h);
            h+=8;


            // referencia
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('REFERENCIA: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text(this.pagos[1].referencia.toUpperCase(), 55, h);
            h+=8;
          }


          // Pago en divisa
          else 
          {
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('TIPO DE PAGO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('DIVISA', 55, h);
            h+=8;

            // Monto cancelado
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('MONTO CANCELADO: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            this.pdf.text('$ ' + this.formatoMoneda.setFormato(this.pagos[1].monto.toFixed(2)), 55, h);
            h+=8;

            // Descripcion del billete
            this.pdf.setFont(undefined, 'normal');
            this.pdf.text('DESCRIPCION: ', 15, h);
            this.pdf.setFont(undefined, 'bold');
            text = this.pdf.splitTextToSize(this.pagos[1].descripcion_billete.toUpperCase(), 100); 
            for(let i=0; i<text.length; i++) {
              this.pdf.text(text[i], 55, h);
              h += 8;
            }
          }
          
        }


      }


      /////////////////////////////////////////////////
      h += 8;


      // PRODUCTOS COMPRADOS
      // Titulo
      this.pdf.setFontSize(14);
      this.pdf.setFont(undefined, 'bold');
      text = 'PRODUCTOS';
      this.pdf.text(text, this.centro(text), h);
      h+=8;

      // IMPRIMIR PRODUCTOS
      // Preparar Array
      let proArray = new Array();
      let total = 0;
      let totalCantidad = 0;
      let i2 : number;
      this.productos.forEach((e, i) => 
      {
        proArray[i] = [
          e.codigo,
          e.nombre,
          e.cantidad,
          this.formatoMoneda.setFormato((e.precio*e.cantidad).toFixed(2))
        ];

        totalCantidad += parseInt(e.cantidad);
        total += parseFloat(e.precio)*e.cantidad;
        i2 = i;
      });  


      proArray[i2+1] = [
        '',
        'TOTAL',
        totalCantidad,
        this.formatoMoneda.setFormato(total.toFixed(2))
      ];
      
      // Imprimir en tabla
      autoTable(this.pdf, { 
        head: [['CODIGO', 'NOMBRE', 'CANTIDAD', 'PRECIO($)']],
        body: proArray,
        startY: h
      })
      /////////////////////////////////////////////////



      // Descargar PDF
      this.pdf.save('Recibo de compra');
    })
  }




  centro(text) : any // Calcula el centro de un texto en el pdf
  {
    let fontSize = this.pdf.getFontSize();
    let pageWidth = this.pdf.internal.pageSize.width;

    let txtWidth = this.pdf.getStringUnitWidth(text)*fontSize/this.pdf.internal.scaleFactor;
    let centro = ( pageWidth - txtWidth ) / 2;

    return centro;
  }

  derec(text) : any 
  {
    let fontSize = this.pdf.getFontSize();
    let pageWidth = this.pdf.internal.pageSize.width;
    let txtWidth = this.pdf.getStringUnitWidth(text)*fontSize/this.pdf.internal.scaleFactor;
    let derec = ( pageWidth - (txtWidth+15)); // 20 es el margen del pdf

    return derec;
  }


  total$() {
    let total: number = 0;
    this.productos.forEach(e => total += parseFloat(e.precio) * parseInt(e.cantidad))
    return total.toFixed(2);
  }


  totalBs() {
    let total: number = 0;
    this.productos.forEach(e => total += (parseFloat(e.precio)*parseFloat(this.recibo.tasa_dolar) * parseInt(e.cantidad)))
    return total.toFixed(2);
  }

}
