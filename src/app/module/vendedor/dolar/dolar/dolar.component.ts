import { Component, OnInit } from '@angular/core';
import { DolarService } from '../../../../shared/service/dolar.service';

import { FormatoMoneda } from '../../../../shared/helper/formato-moneda';

import * as alertify from 'alertifyjs';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-dolar',
  templateUrl: './dolar.component.html',
  styleUrls: ['./dolar.component.css']
})
export class DolarComponent implements OnInit {

  dolarFormato = null;
	dolar = { valor:null };

  constructor(private dolarService: DolarService,
              public formatoMoneda: FormatoMoneda) { }

  ngOnInit(): void {
  	this.consultarDolar();
  }


  consultarDolar(){
    this.dolarService.consultarOne().subscribe(res => 
    {
      this.dolarFormato = this.formatoMoneda.setFormato(parseFloat(res['valor']).toFixed(2));
      // this.dolar.valor=res['valor'] 
    });
  }


  tipearMoneda()
  {
    this.dolarFormato = this.formatoMoneda.setFormato(this.dolarFormato);
  }

  editar(){
    $('#dolar-form').validate({
      rules : {
        dolar: { required:true }
      },
      messages: {
        dolar: { required:'Campo requerido' }
      },

      submitHandler: ()=> 
      {
        this.dolar.valor = this.formatoMoneda.limpiar(this.dolarFormato);

      	this.dolarService.editar(this.dolar.valor).subscribe(resp => {

      		if(resp['mens'] == 'OK')
      			alertify.alert('Alerta', 'Valor del dolar modificado')
      		else
      			alertify.alert('Alerta', 'Ha ocurrido un error, intenta de nuevo')
      	});
      }
    })
  }

}
