import { Component, OnInit } from '@angular/core';

import { BannerPrincipalService } from '../../../../../shared/service/banner-principal.service';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

	banners = null;
	bannerActivo = true;


  constructor(private bannerPrincipalService: BannerPrincipalService) { }

  ngOnInit(): void {
  	this.consTodos();
  }

  consTodos() {
  	this.bannerPrincipalService.consTodos().subscribe(resp => {
  		this.banners = resp;

      this.activarBanner();
  	})
  }


  // Activa unicamente el primer banner
  activarBanner() {
  	setTimeout(()=> $('.carousel-inner .carousel-item:first').addClass('active'), 100)
  }

}
