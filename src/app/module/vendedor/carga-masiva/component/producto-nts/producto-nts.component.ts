import { Component, OnInit } from '@angular/core';
import { CargaMasivaService } from '../../../../../shared/service/carga-masiva.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-producto-nts',
  templateUrl: './producto-nts.component.html',
  styleUrls: ['./producto-nts.component.css']
})
export class ProductoNtsComponent implements OnInit {

	espera = false;

	data = {
	  nombre: null,
	  base64: null
	}

  constructor(private cargaMasivaService: CargaMasivaService) { }

  ngOnInit(): void {
  }


  cargarDatos()
  {
    $('#carga-masiva-form').validate({
      rules : {
        data: { required:true }
      },
      messages: {
        data: { required:'Campo requerido' }
      },

      submitHandler: ()=> 
      {
        this.espera = true;

        this.cargaMasivaService.cargarDatos().subscribe(resp => 
        {
          this.espera = false;

          if(resp['mens'] == 'OK')
          {
            alertify.alert('Alerta', 'Data cargada exitosamente');
          }
          else 
            alertify.alert('Alerta', 'Ha ocurrido un error, intenta de nuevo');

          console.log(resp);
        });
      }
    })
  }


  selecData(event)
  {
    var files = event.target.files;
    var file = files[0];
    this.data.nombre = file.name;

    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.data.base64 = btoa(binaryString); // Pasa cadena a 64 bits


    // Subir data
    this.cargaMasivaService.subirData(this.data).subscribe(resp => 
    {
      if(resp['mens'] == 'OK')
        alertify.success('Data subida');
    }) 
  }

}
