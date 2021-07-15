import { Component, OnInit } from '@angular/core';

import { ClienteService } from '../../../../../../shared/service/cliente.service';

declare var $:any;


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

	cliente = {
		nombre: null,
		apellido: null,
		tipo_doc: null,
    doc: null,
		username: null,
		telefono: null,
		direccion: null
	}

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
  }


  consUno(id_user)
  {
    this.clienteService.consUno(id_user).subscribe(resp => 
    {
      this.cliente.nombre = resp['nombre'];
      this.cliente.apellido = resp['apellido'];
      this.cliente.tipo_doc = resp['tipo_doc'];
      this.cliente.doc = resp['doc'];
      this.cliente.username = resp['username'];
      this.cliente.telefono = resp['telefono'];
      this.cliente.direccion = resp['direccion'];
      

      $('#cliente-consulta-modal').modal('show');
    });
  }

}
