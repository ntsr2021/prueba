import { Component, OnInit } from '@angular/core';
import { ProductoMultimaxService } from '../../../../../shared/service/producto-multimax.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-perfume-multimax',
  templateUrl: './perfume-multimax.component.html',
  styleUrls: ['./perfume-multimax.component.css']
})
export class PerfumeMultimaxComponent implements OnInit {

	espera = false;

	data = {
	  nombre: null,
	  base64: null
	}


  constructor(private productoMultimaxService: ProductoMultimaxService) { }

  ngOnInit(): void {
  }


  cargarDatos()
  {
    $('#carga-masiva-multimax-form').validate({
      rules : {
        data: { required:true }
      },
      messages: {
        data: { required:'Campo requerido' }
      },

      submitHandler: ()=> 
      {
        this.espera = true;

        this.productoMultimaxService.cargarDatos().subscribe(resp => 
        {
          this.espera = false;

          if(resp['mens'] == 'OK')
            alertify.alert('Alerta', 'Data cargada exitosamente');
          else 
            alertify.alert('Alerta', 'Ha ocurrido un error, intenta de nuevo');
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


    this.productoMultimaxService.subirData(this.data).subscribe(resp => 
    {
      if(resp['mens'] == 'OK')
        alertify.success('Data subida');
    }) // Subir archivo a la carpeta temporal
  }


}
