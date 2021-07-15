import { Component, OnInit, Input } from '@angular/core';

import { ReciboService } from './../../../../../../shared/service/recibo.service';
import { DolarService } from './../../../../../../shared/service/dolar.service';
import { Router } from '@angular/router';

import { FormatoMoneda } from './../../../../../../shared/helper/formato-moneda';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-efectivo',
  templateUrl: './efectivo.component.html',
  styleUrls: ['./efectivo.component.css']
})
export class EfectivoComponent implements OnInit {

	@Input() metodo_entrega = null;

	prodCarro = JSON.parse(localStorage.getItem('prodCarro'));
	dolar = null;

	pago = {
	  forma_pago: 'divisa',
	  nombre_titular: null,
	  tipo_doc_titular: 'v',
	  doc_titular: null,
	  referencia: null,
    monto: null,
	  descripcion_billete: null
	}


  constructor(private reciboService: ReciboService,
              private dolarService: DolarService,
              private router: Router,
              public formatoMoneda: FormatoMoneda) { }


  ngOnInit(): void {
  	this.consDolar();
  }


  consDolar() {
    this.dolarService.consultarOne().subscribe(resp => this.dolar = resp['valor'] )
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

      this.pago.monto = total.toFixed(2);

      return total.toFixed(2);
    }
  }


  finalizar() // pago-efectivo
  {
    $('#pago-divisa').validate({
      rules : {
        descripcion_billete: { required:true, maxlength:500, descripcion:true }
      },
      messages: {
        descripcion_billete: { required:'Campo requerido', maxlength:'Máximo 500 caracteres' }
      },


      submitHandler: ()=> 
      {
        alertify.confirm('Confirmar', '¿Está seguro(a) que desea finalizar la compra?', ()=>
        {

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
              alertify.alert('Alerta', 'Ha ocurrido un error, intenta de nuevo');
          })

        }, ()=>{})

      }
    })
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
