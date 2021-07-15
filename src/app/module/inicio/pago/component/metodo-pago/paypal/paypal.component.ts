import { Component, OnInit, Input } from '@angular/core';

declare var paypal: any;
declare var $: any;
import * as alertify from 'alertifyjs';

import { FormatoMoneda } from './../../../../../../shared/helper/formato-moneda';

import { ReciboService } from './../../../../../../shared/service/recibo.service';
import { DolarService } from './../../../../../../shared/service/dolar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  carroCompra:any = JSON.parse(localStorage.getItem('prodCarro'));
  @Input() metodo_entrega = null;

  dolar = null;

  pago = {
    forma_pago: 'paypal',
    nombre_titular: null,
    tipo_doc_titular: 'v',
    doc_titular: null,
    referencia: null,
    monto: null,
    descripcion_billete: null
  }

  comision = null;


  constructor(private reciboService: ReciboService,
              private dolarService: DolarService,
              private router: Router,
              public formatoMoneda: FormatoMoneda) { }



  ngOnInit(): void {
    this.consDolar();
    this.pago.monto = parseFloat(this.total$());
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
          purchase_units: [{"amount":{"currency_code":"USD","value":this.pago.monto+parseFloat(this.comision)}}],
          
          payer: {
            address: {
              country_code: 'VE'
            }
          }

        });
      },

      onApprove: (data, actions)=> 
      {
        return actions.order.capture().then(details => 
        {
          
          // Codigo de la transaccion
          this.pago.referencia = details.id;



          let recibo = {
            token : localStorage.getItem('tokenCliente'),
            productos : localStorage.getItem('prodCarro'),
            pago: this.pago,
            metodo_entrega : this.metodo_entrega
          }


          this.reciboService.registrar(recibo).subscribe(resp => 
          {
            localStorage.setItem('prodCarro', JSON.stringify(null)); // Vaciar carro de compra
            $('#carro-icon-cont').hide();
            $('#carro-icon-cont').text('');


            if(resp['mens'] == 'OK')
            {
              alertify.alert('Alerta', '¡Compra realizada exitosamente!. Nos comunicaremos con usted a la brevedad posible');

              // Crear var pagoFinalizado para que el guard que protege la ruta permita salir del modulo
              localStorage.setItem('pagoFinalizado', 'true');
              
              this.router.navigate(['cliente']);

              window.scroll(0, 0);
            }else
              alertify.alert('Alerta', 'Ha ocurrido un error, intente de nuevo o comuníquese con nosotros al número +58 424-4346395 (Asesores NTS Online)');
          })


        }); 
      },

      onError: err => {
        console.log(err);
      }
    }).render('#paypal-button-container');
  }



  calcularComision()
  {
    let porcComision = 5.4;
    let dolComision = 0.30;


    let monto = this.pago.monto;



    let enviar:any = (100 * (dolComision + monto)) / ((0 - porcComision) + 100);
    enviar = Math.round(enviar * 100) / 100;


    this.comision = enviar - monto;
    this.comision = Math.round(this.comision * 100) / 100;
    this.comision = this.comision.toFixed(2);

    return this.comision;
  }
    



  total$()
  {
    let total = 0;

    this.carroCompra.forEach(e=> {
      total += parseFloat(e.precio)*e.can_comprar;
    });

    return total.toFixed(2);
  }



  anterior()
  {
    $('#stepper-item-3').removeClass('stepper-item-active');
    $('#stepper-item-2').addClass('stepper-item-active');

    $('#stepper-content-3').hide(100);
    $('#stepper-content-2').show(100);

    window.scroll(0, 0);
  }


  

}
