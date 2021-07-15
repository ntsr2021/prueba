import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Tarjeta de Angular Material
import { MatListModule } from '@angular/material/list'; // Lista Angular Material

import { NosotrosRoutingModule } from './nosotros-routing.module';

import { NosotrosComponent } from './nosotros/nosotros.component';
import { PosterComponent } from './component/poster/poster.component';
import { IdentificacionComponent } from './component/identificacion/identificacion.component';
import { VideoComponent } from './component/video/video.component';


@NgModule({
  declarations: [NosotrosComponent, PosterComponent, IdentificacionComponent, VideoComponent],
  imports: [
    CommonModule,
    NosotrosRoutingModule,
    MatCardModule,
    MatListModule
  ]
})
export class NosotrosModule { }
