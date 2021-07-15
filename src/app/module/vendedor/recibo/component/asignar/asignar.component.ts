import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { VendedorService } from './../../../../../shared/service/vendedor.service';
import { ReciboService } from './../../../../../shared/service/recibo.service';

declare var $:any;

import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {

	vendedores = null;
	vendedor = null;
  id_recibo = null;

  @Output() asignarEvent = new EventEmitter();


  constructor(private vendedorService: VendedorService,
              private reciboService: ReciboService) { }

  ngOnInit(): void {
  	this.consTodos();
  }


  consTodos() {
  	this.vendedorService.consSoloVendedores().subscribe(resp => this.vendedores = resp )
  }


  abrirModal(id_recibo, vendedor)
  {
  	this.vendedor = vendedor;
    this.id_recibo = id_recibo;

  	$('#asignar-modal').modal('show');
  }


  asignar()
  {
    $('#asignar-form').validate({
      rules : {
        vendedor: { required:true }
      },
      messages: {
        vendedor: { required:'Campo requerido' }
      },

      submitHandler: ()=> 
      {
      	this.reciboService.asignar(this.vendedor, this.id_recibo).subscribe(resp => 
        {
          if(resp['mens'] == 'OK')
          {
            alertify.success('Asignación exitosa');
            $('#asignar-modal').modal('hide');
            this.asignarEvent.emit(true);
          }else 
            alertify.error('Ha ocurrido un error, intenta de nuevo');
        });
      }
    })
  }

}
