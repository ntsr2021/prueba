import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BannerMarcaService } from '../../../../../shared/service/banner-marca.service';

declare var $:any;


@Component({
  selector: 'app-banner2',
  templateUrl: './banner2.component.html',
  styleUrls: ['./banner2.component.css']
})
export class Banner2Component implements OnInit {

	banners = null;


  constructor(private bannerMarcaService: BannerMarcaService) { }

  ngOnInit(): void {
  	this.consTodos();
  }

  consTodos() {
  	this.bannerMarcaService.consTodos().subscribe(resp => {
  		this.banners = resp;
      setTimeout(()=> $('#carousel').elastislide(), 150)
  	})
  }

}
