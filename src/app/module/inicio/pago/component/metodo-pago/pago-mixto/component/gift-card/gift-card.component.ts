import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DolarService } from './../../../../../../../../shared/service/dolar.service';
import { GiftCardService } from './../../../../../../../../shared/service/gift-card.service';

import { FormatoMoneda } from './../../../../../../../../shared/helper/formato-moneda';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {

	prodCarro = JSON.parse(localStorage.getItem('prodCarro'));
	dolar = null;

  montoFormato: any = null;
	pago = {
	  forma_pago: 'gift_card',
	  nombre_titular: null,
    monto: null,
    diferencia: null,
	  tipo_doc_titular: 'v',
	  doc_titular: null,
	  referencia: null,
	  descripcion_billete: null
	}

	token = localStorage.getItem('tokenCliente');

  @Output() sigEvent = new EventEmitter();
  @Output() antEvent = new EventEmitter();

  @Input() montoPagado : any = null;
  @Input() monedaEmpleada : any = null;


  constructor(private dolarService: DolarService,
              public formatoMoneda: FormatoMoneda,
              private giftCardService: GiftCardService) { }


  ngOnInit(): void {
  	this.consDolar();
  }


  consDolar() {
    this.dolarService.consultarOne().subscribe(resp => this.dolar = resp['valor'] )
  }


  siguiente() // pago-efectivo
  {
    $('#pm-pago-gift-card').validate({
      rules : {
        pm_monto: { required:true },
        pm_codigo: { required:true, codigo_gift_card:true }
      },
      messages: {
        pm_monto: { required:'Campo requerido' },
        pm_codigo: { required:'Campo requerido' }
      },


      submitHandler: ()=> 
      {
        if(this.montoPagado == null)
          this.pago.monto = this.formatoMoneda.limpiar(this.montoFormato); 

        if(this.pago.monto <= 0 && this.montoPagado == null)
          alertify.alert('Alerta', 'El monto no debe ser menor o igual a 0');

        else if (this.pago.monto >= parseFloat(this.total())  && this.montoPagado == null)
          alertify.alert('Alerta', 'El monto no debe ser mayor o igual al total');
        
        else 
        {
        	if(this.montoPagado != null) // Pasar la diferencia al monto del segundo pago 
            this.pago.monto = this.pago.diferencia;


        	// Verificar que la Gift Card contenga saldo suficiente
        	let verif = {
        		token: this.token,
        		codigo: this.pago.referencia,
        		monto: this.pago.monto
        	}


        	this.giftCardService.verificarSaldo(verif).subscribe(resp => 
        	{
        		if(resp['mens'] == 'OK')
        		{
        			this.sigEvent.emit(this.pago); 
        		}

        		// Posibles errores
        		else if(resp['mens'] == 'codigo_inexistente') 
        			alertify.alert('Alerta', `El código de la Gift Card es incorrecto.`);
        		else if(resp['mens'] == 'saldo_insuficiente')
        			alertify.alert('Alerta', `El saldo de su Gift Card es insuficiente para poder realizar la compra.`);
        	})


        }
      }
    })
  }


  anterior()
  {
    this.antEvent.emit(true);
  }


  total()
  {
    let total = 0;
    this.prodCarro.forEach(e=> {
      total += parseFloat(e.precio)*e.can_comprar;
    });


    if(this.montoPagado != null) // Si estamos en el segundo proceso de compra
    {

      let montoPagado = this.montoPagado; // Pasar valor a una variable local para no modificar la global


      if(this.monedaEmpleada == 'bolivares') // Si el monto pagado ha sido en bs, se pasa a $
        montoPagado /= this.dolar;

      let diferencia = (total - montoPagado).toFixed(2);
      this.pago.diferencia = diferencia;
      

      return diferencia;
    }
    else // Total para el primer metodo de pago
      return total.toFixed(2);
  }


  // A medida que se escribe la cantidad a pagar el metodo la seteara al formato correcto
  tipear()
  {
    this.montoFormato = this.formatoMoneda.setFormato(this.montoFormato);
  }

}
