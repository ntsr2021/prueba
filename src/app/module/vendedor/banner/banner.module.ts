import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { MatTabsModule } from '@angular/material/tabs';

import { PrincipalModule } from './principal/principal.module';
import { MarcaModule } from './marca/marca.module';
import { BannerRoutingModule } from './banner-routing.module';


@NgModule({
  declarations: [BannerComponent],
  imports: [
    CommonModule,
    BannerRoutingModule,
    MatTabsModule,
    PrincipalModule,
    MarcaModule
  ]
})
export class BannerModule { }
