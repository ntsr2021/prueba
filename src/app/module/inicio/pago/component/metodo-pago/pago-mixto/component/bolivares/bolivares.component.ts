import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DolarService } from './../../../../../../../../shared/service/dolar.service';

import { FormatoMoneda } from './../../../../../../../../shared/helper/formato-moneda';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-bolivares',
  templateUrl: './bolivares.component.html',
  styleUrls: ['./bolivares.component.css']
})
export class BolivaresComponent implements OnInit {


	prodCarro = JSON.parse(localStorage.getItem('prodCarro'));
	dolar = null;


  montoFormato: any = null;
	pago = {
	  forma_pago: 'tran_bs',
	  nombre_titular: null,
    monto: null,
    diferencia: null,
	  tipo_doc_titular: 'v',
	  doc_titular: null,
	  referencia: null,
	  descripcion_billete: null
	}

  @Output() sigEvent = new EventEmitter();
  @Output() antEvent = new EventEmitter();

  @Input() montoPagado: any = null;
  @Input() monedaEmpleada: any = null;


  constructor(private dolarService: DolarService,
              public formatoMoneda: FormatoMoneda) { }

  ngOnInit(): void {
  	this.consDolar();
  }


  consDolar() {
    this.dolarService.consultarOne().subscribe(resp => this.dolar = resp['valor'] )
  }


  siguiente() // pago-bs
  {
    $('#pm-pago-bs').validate({
      rules : {
        pm_monto: { required:true },
        pm_nombre_titular: { required:true, maxlength:100, alfanumerico:true },
        pm_doc_titular: { required:true, digits:true, minlength:5, maxlength:11 },
        pm_referencia: { required:true, alfanumerico:true, minlength:4, maxlength:20 }
      },
      messages: {
        pm_monto: { required:'Campo requerido' },
        pm_nombre_titular: { required:'Campo requerido', maxlength:'Máximo 100 caracteres' },
        pm_doc_titular: { required:'Campo requerido', digits:'Solo numeros', minlength:'Minimo 5 digitos', maxlength:'Maximo 11 digitos' },
        pm_referencia: { required:'Campo requerido', minlength:'Mínimo 4 caracteres', maxlength:'Máximo 20 caracteres' }
      },


      submitHandler: ()=> 
      {
        if(this.montoPagado == null)
          this.pago.monto = this.formatoMoneda.limpiar(this.montoFormato);  

        if(this.pago.monto <= 0 && this.montoPagado == null)
          alertify.alert('Alerta', 'El monto no debe ser menor o igual a 0');

        else if (this.pago.monto >= parseFloat(this.total()) && this.montoPagado == null)
          alertify.alert('Alerta', 'El monto no debe ser mayor o igual al total');
        
        else 
        {

          if(this.montoPagado != null) // Pasar la diferencia al monto del segundo pago 
            this.pago.monto = this.pago.diferencia;

          this.sigEvent.emit(this.pago);
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
    total *= this.dolar; // Pasar total a bs


    if(this.montoPagado != null) // Si estamos en el segundo proceso de compra
    {

      let montoPagado = this.montoPagado; // Pasar valor a una variable local para no modificar la global


      if(this.monedaEmpleada == 'dolares') // Si el monto pagado ha sido en $, se pasa a bs
        montoPagado *= this.dolar; 

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


