import { Component, OnInit } from '@angular/core';

import { BannerPrincipalService } from '../../../../../shared/service/banner-principal.service';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {


	banners = null;
	banner = {
		foto: null,
		base64: null
	}
  banner2 = { 
    id_banner: null,
    foto: null,
    base64: null
  }

  marcaTiempo = 0;



  constructor(private bannerPrincipalService: BannerPrincipalService) { }

  ngOnInit(): void {
    this.consTodos();
  }

  
  consTodos() {
  	this.bannerPrincipalService.consTodos().subscribe(resp => {
  		this.banners = resp;
      ++this.marcaTiempo;
  	})
  }


  
  clicFile() 
  {
  	if(this.banners != null)
  	{
  	  if(this.banners.length < 9) // Valida que solo se puedan agregar 9 banners
  	    $('[name="banner"]').click();
  	  else 
  	    alertify.alert('Alerta', 'Solo se permiten 5 banners');
  	}else 
  	  $('[name="banner"]').click();
  }


  // Abre explorador de archivos y selecciona img
  seleccionarArchivo(event)
  {
    var files = event.target.files;
    var file = files[0];


    this.banner.foto = file.name; // Guardar nombre y extensión del archivo  


    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.banner.base64 = btoa(binaryString); // Pasa cadena a 64 bits


    this.agregar();
  }


  agregar()
  {
  	this.bannerPrincipalService.agregar(this.banner).subscribe(resp =>
  	{
  		if(resp['mens'] == 'OK')
  		{
  		  alertify.success('Banner agregado');
  		  this.consTodos();
  		}else 
  		  alertify.error('Ejecución fallida');
  	})
  }

  eliminar(id_banner_principal)
  {
    alertify.confirm('Confirmar', '¿Estás seguro que deseas eliminar?',
    ()=> {
      this.bannerPrincipalService.eliminar(id_banner_principal).subscribe(resp => 
      {
        if(resp['mens'] == 'OK') 
        {
          alertify.success('Banner eliminado');
          this.consTodos();
        }else 
          alertify.error('Ejecución fallida');
      });
    }, ()=>{});
  }

  // Editar banner
  clicFile2(banner) { 
    this.banner2.id_banner = banner.id_banner_principal;
    $('[name="banner2"]').click(); 
  }
  seleccionarArchivo2(event)
  {
    var files = event.target.files;
    var file = files[0];


    this.banner2.foto = file.name;


    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded_2.bind(this);
    reader.readAsBinaryString(file);
  }
  _handleReaderLoaded_2(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.banner2.base64 = btoa(binaryString); // Pasa cadena a 64 bits


    this.editar();
  }



  editar()
  {
    this.bannerPrincipalService.editar(this.banner2).subscribe(resp =>
    {
      if(resp['mens'] == 'OK')
      {
        alertify.success('Banner editado');
        this.consTodos();
      }else 
          alertify.error('Ejecución fallida');
    })
  }



  // Subir y bajar posicion de los banners

  subirPosicion(id_banner_principal)
  {
    this.bannerPrincipalService.subirPosicion(id_banner_principal).subscribe(resp => 
    {
      if(resp['mens'] == 'OK')
        this.consTodos();
      else
        alertify.alert('Alerta', 'No es posible subir más el banner'); 
    })
  }

  bajarPosicion(id_banner_principal)
  {
    this.bannerPrincipalService.bajarPosicion(id_banner_principal).subscribe(resp => 
    {
      if(resp['mens'] == 'OK')
        this.consTodos();
      else
        alertify.alert('Alerta', 'No es posible bajar más el banner'); 
    })
  }

}