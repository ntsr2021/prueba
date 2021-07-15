import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu'; // Menu de categorias en Angular
import { MatButtonModule } from '@angular/material/button'; // Menu de categorias en Angular

import { PrincipalRoutingModule } from './principal-routing.module';

import { InstagramComponent } from './component/instagram/instagram.component';
import { BannerComponent } from './component/banner/banner.component';
import { PrincipalComponent } from './principal/principal.component';
import { Banner2Component } from './component/banner2/banner2.component';


@NgModule({
  declarations: [BannerComponent, PrincipalComponent, Banner2Component, InstagramComponent],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class PrincipalModule { }
