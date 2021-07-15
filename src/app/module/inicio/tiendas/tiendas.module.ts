import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendasComponent } from './tiendas/tiendas.component';

import { TiendasRoutingModule } from './tiendas-routing.module';


@NgModule({
  declarations: [TiendasComponent],
  imports: [
    CommonModule,
    TiendasRoutingModule
  ]
})
export class TiendasModule { }
