import { Component, OnInit, Input } from '@angular/core';

import { UserService } from './../../../../../../shared/service/user.service';

declare var $:any;


@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styleUrls: ['./metodo-pago.component.css']
})
export class MetodoPagoComponent implements OnInit {

	@Input() metodo_entrega = null;

  jwt = {
    token : localStorage.getItem('tokenCliente')
  }

  user = null;

	forma_pago = '';


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  	this.consUser(); // Servira para verificar al cliente q posee la gift card (ganador del concurso)
  }


  consUser() {
    this.userService.consultar(this.jwt).subscribe(resp => this.user = resp);
  }


  // Btn temporal para retroceder
  anterior()
  {
    $('#stepper-item-3').removeClass('stepper-item-active');
    $('#stepper-item-2').addClass('stepper-item-active');

    $('#stepper-content-3').hide(100);
    $('#stepper-content-2').show(100);

    window.scroll(0, 0);
  }


  formaPago()
  {
    $('#punico-btn-anterior').hide();

  	$('.forma-activa').hide();
  	$('#'+this.forma_pago).show().addClass('forma-activa');
  }

}
