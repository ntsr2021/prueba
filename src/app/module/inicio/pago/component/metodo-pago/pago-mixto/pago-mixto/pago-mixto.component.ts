import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { ReciboService } from './../../../../../../../shared/service/recibo.service';
import { Router } from '@angular/router';

import { UserService } from './../../../../../../../shared/service/user.service';

declare var $:any;
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-pago-mixto',
  templateUrl: './pago-mixto.component.html',
  styleUrls: ['./pago-mixto.component.css']
})
export class PagoMixtoComponent implements OnInit {

	@Input() metodo_entrega = null;

  jwt = {
    token : localStorage.getItem('tokenCliente')
  }

  user = null;

	forma_pago = null;

  // Guardaran los datos de ambos pagos
  pago1 = null;
  pago2 = null;


  numMetodo = 1;

  montoPagado = null;
  monedaEmpleada = null;


  constructor(private reciboService: ReciboService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.consUser(); // Servira para verificar al cliente q posee la gift card (ganador del concurso)
  }


  consUser() {
    this.userService.consultar(this.jwt).subscribe(resp => this.user = resp);
  }


  formaPago()
  {
    $('#pm-btn-anterior').hide(); // Ocultar btn retroceder 

  	$('.pm-forma-activa').hide();
  	$('#'+this.forma_pago).show().addClass('pm-forma-activa');
  }



  siguiente(event)
  {
    if(this.numMetodo == 1)
    {
      this.pago1 = event;


      $('#content-metodo').hide(100, ()=> 
      {

        // Ocultar opcion correspondiente
        switch (this.forma_pago) 
        {
          case 'pm_tran_dol':
            $('[value="pm_tran_dol"]').hide();
            this.monedaEmpleada = 'dolares';
            break;

          case 'pm_tran_bs':
            $('[value="pm_tran_bs"]').hide();
            this.monedaEmpleada = 'bolivares';
            break;

          case 'pm_pago_movil':
            $('[value="pm_pago_movil"]').hide();
            this.monedaEmpleada = 'bolivares';
            break;

          case 'pm_divisa':
            $('[value="pm_divisa"]').hide();
            this.monedaEmpleada = 'dolares';
            break;

          case 'pm_gift_card':
            $('[value="pm_gift_card"]').hide();
            this.monedaEmpleada = 'dolares';
            break;

          case 'pm_paypal':
            $('[value="pm_paypal"]').hide();
            this.monedaEmpleada = 'dolares';
            break;
        }
        $('.pm-forma-activa').hide();


        $('#metodo-title').text('Segundo método de pago');


        this.montoPagado = this.pago1.monto;


        $('#content-metodo').show(100);

        
        $('#pm-btn-anterior').show(); // Aparecer btn retroceder cuando no hai ninguna opc selec.


        ++this.numMetodo;

      });
    }

    else 
    {
      this.pago2 = event;


      if(this.pago2.forma_pago != 'paypal')
      {
        alertify.confirm('Confirmar', '¿Está seguro(a) que desea finalizar la compra?', ()=> this.guardarRecibo(), ()=>{})
      }else 
      {
        this.guardarRecibo();
      }
      
    }
    
  }


  guardarRecibo()
  {
    let recibo = {
      token : localStorage.getItem('tokenCliente'),
      productos : localStorage.getItem('prodCarro'),
      pago: this.pago1,
      pago2: this.pago2,
      metodo_entrega : this.metodo_entrega
    }


    this.reciboService.registrar(recibo).subscribe(resp => 
    {  
      localStorage.setItem('prodCarro', JSON.stringify(null));
      $('#carro-icon-cont').hide();
      $('#carro-icon-cont').text('');


      if(resp['mens'] == 'OK')
      {
        alertify.alert('Alerta', '¡Compra realizada exitosamente!. Nos comunicaremos con usted a la brevedad posible');

        // Crear var pagoFinalizado para que el guard que protege la ruta permita salir del modulo
        localStorage.setItem('pagoFinalizado', 'true');

        this.router.navigate(['cliente']);
        window.scroll(0,0); 
      }else
        alertify.alert('Alerta', 'Ha ocurrido un error, intenta de nuevo');
    })
  }


  anterior()
  {
    if(this.numMetodo == 1)
    {

      $('#stepper-item-3').removeClass('stepper-item-active');
      $('#stepper-item-2').addClass('stepper-item-active');

      $('#stepper-content-3').hide(100);
      $('#stepper-content-2').show(100);

      window.scroll(0, 0);

    }else 
    {
      if(this.pago1.forma_pago != 'paypal')
      {

        --this.numMetodo;

        this.montoPagado = null;


        $('#content-metodo').hide(100, ()=> 
        {
          $('.pm-forma-activa').hide();

          // Mostrar opcion correspondiente
          switch (this.pago1.forma_pago) 
          {

            case 'tran_dol':
              $('[value="pm_tran_dol"]').show();
              this.forma_pago = 'pm_tran_dol';
              $('#pm_tran_dol').show();
              break;

            case 'tran_bs':
              $('[value="pm_tran_bs"]').show();
              this.forma_pago = 'pm_tran_bs';
              $('#pm_tran_bs').show();
              break;

            case 'pago_movil':
              $('[value="pm_pago_movil"]').show();
              this.forma_pago = 'pm_pago_movil';
              $('#pm_pago_movil').show();
              break;

            case 'divisa':
              $('[value="pm_divisa"]').show();
              this.forma_pago = 'pm_divisa';
              $('#pm_divisa').show();
              break;

            case 'paypal':
              $('[value="pm_paypal"]').show();
              this.forma_pago = 'pm_paypal';
              $('#pm_paypal').show();
              break;
          }

          $('#metodo-title').text('Primer método de pago');

          $('#content-metodo').show(100);

          // Ocultar btn retroceder
          $('#pm-btn-anterior').hide();

        })
      
      }
      else {
        alertify.alert('Alerta', 'No es posible modificar el metodo de pago anterior');
      }


    }
  }

  

}


