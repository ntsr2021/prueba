import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var paypal: any;
declare var $: any;

import { FormatoMoneda } from './../../../../../../../../shared/helper/formato-moneda';

import { DolarService } from './../../../../../../../../shared/service/dolar.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  carroCompra:any = JSON.parse(localStorage.getItem('prodCarro'));
  dolar = null;

  montoFormato: any = '0,00';
  pago = {
    forma_pago: 'paypal',
    nombre_titular: null,
    tipo_doc_titular: 'v',
    doc_titular: null,
    referencia: null,
    monto: null,
    diferencia: null,
    descripcion_billete: null
  }

  montoValidoTipeado = false;

  comision = null;

  @Output() sigEvent = new EventEmitter();
  @Output() antEvent = new EventEmitter();

  @Input() montoPagado : any = null;
  @Input() monedaEmpleada : any = null;


  constructor(private dolarService: DolarService,
              public formatoMoneda: FormatoMoneda) { }



  ngOnInit(): void {
    this.consDolar();
    this.calcularComision();
  	this.initPayPalButton();
  }


  consDolar() {
    this.dolarService.consultarOne().subscribe(resp => this.dolar = resp['valor'] )
  }



	initPayPalButton() 
  {

    paypal.Buttons({



      style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'paypal',
      },

      createOrder: (data, actions)=> 
      {
        return actions.order.create({
          purchase_units: [{
          	amount: { 
          		currency_code: "USD",
          		value: (this.montoPagado == null) ? this.pago.monto+parseFloat(this.comision) : this.pago.diferencia+parseFloat(this.comision)
          	}
          }],
          
          payer: {
            address: {
              country_code: 'VE'
            }
          },

          
          

        });
      },





      onApprove: (data, actions)=> 
      {
        return actions.order.capture().then(details => 
        {
          
          // Codigo de la transaccion
          this.pago.referencia = details.id;



          if(this.montoPagado == null)
          {
            
            this.pago.monto = this.formatoMoneda.limpiar(this.montoFormato); 
          }

          
          else if(this.montoPagado != null) // Pasar la diferencia al monto del segundo pago 
              this.pago.monto = this.pago.diferencia;


          alertify.success('Transacción realizada exitosamente');

           
          this.sigEvent.emit(this.pago); 
         
        }); 


      },

      onError: err => {
        console.log(err);
      }
    }).render('#pago-mixto-paypal-button-container');
  }
    



  total() : number
  {
    let total:any = 0;

    this.carroCompra.forEach(e => {
      total += parseFloat(e.precio) * e.can_comprar;
    });


    if(this.montoPagado != null) // Si estamos en el segundo proceso de compra
    {
      let montoPagado:any = parseFloat(this.montoPagado); // Pasar valor a una variable local para no modificar la global




      if(this.monedaEmpleada == 'bolivares') // Si el monto pagado ha sido en bs, se pasa a $
        montoPagado /= parseFloat(this.dolar);

      total = (total - montoPagado).toFixed(2);


      this.pago.diferencia = parseFloat(total);
    }

    


    return parseFloat(total);
  }


  calcularComision()
  {
    let porcComision = 5.4;
    let dolComision = 0.30;


    let monto = 0;
    if(this.montoPagado != null)
      monto = this.pago.diferencia;
    else 
      monto = this.pago.monto;



    let enviar:any = (100 * (dolComision + monto)) / ((0 - porcComision) + 100);
    enviar = Math.round(enviar * 100) / 100;


    this.comision = enviar - monto;
    this.comision = Math.round(this.comision * 100) / 100;
    this.comision = this.comision.toFixed(2);

    return this.comision;
  }


  anterior()
  {
    this.antEvent.emit(true);
  }


  siguiente() 
  {
    this.sigEvent.emit(this.pago); 
  }



  // A medida que se escribe la cantidad a pagar el metodo la seteara al formato correcto
  tipear()
  {
    this.montoFormato = this.formatoMoneda.setFormato(this.montoFormato);


    // Validar monto
    let monto = this.formatoMoneda.limpiar(this.montoFormato);

   
    if(monto >= 1 && monto <= this.total()) // Establecer en 1,00
    {
      if(!this.montoValidoTipeado)
        this.montoValidoTipeado = true;


      $('#paypal-muro').removeClass('paypal-bloquear');
      $('#monto-error').hide().css('display', 'none !important');
      
    }else 
    {
      if(this.montoValidoTipeado)
      {
        $('#paypal-muro').addClass('paypal-bloquear');
        $('#monto-error').show().css('display', 'inline !important');
      }
    }


    this.montoFormato = this.formatoMoneda.setFormato(this.montoFormato);


    this.pago.monto = this.formatoMoneda.limpiar(this.montoFormato);
    this.calcularComision();
  }
  

}
