import { Component, OnInit } from '@angular/core';

import { BannerMarcaService } from '../../../../../shared/service/banner-marca.service';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  banners = null;
  marcaTiempo = 0;

  constructor(private bannerMarcaService: BannerMarcaService) { }


  ngOnInit(): void {
    this.consTodos();
  }

  
  consTodos() {
    this.bannerMarcaService.consTodos().subscribe(resp => {
      ++this.marcaTiempo;
      this.banners = resp;
    })
  }


  eliminar(id_banner_marca)
  {
    alertify.confirm('Confirmar', '¿Estás seguro que deseas eliminar?',
    ()=> {
      this.bannerMarcaService.eliminar(id_banner_marca).subscribe(resp => 
      {
        if(resp['mens'] == 'OK') 
        {
          alertify.success('Marca eliminada');
          this.consTodos();
        }else 
          alertify.error('Ejecución fallida');
      });
    }, ()=>{});
  }


  // Mover a la izquierda o derecha la posicion de los banners

  moverDerecha(id_banner_marca)
  {
    this.bannerMarcaService.moverDerecha(id_banner_marca).subscribe(resp => 
    {
      if(resp['mens'] == 'OK')
        this.consTodos();
      else
        alertify.alert('Alerta', 'No es posible mover más el banner a la derecha'); 
    })
  }

  moverIzquierda(id_banner_marca)
  {
    this.bannerMarcaService.moverIzquierda(id_banner_marca).subscribe(resp => 
    {
      if(resp['mens'] == 'OK')
        this.consTodos();
      else
        alertify.alert('Alerta', 'No es posible mover más el banner a la izquierda'); 
    })
  }

}