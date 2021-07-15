import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { PreguntasFrecuentesRoutingModule } from './preguntas-frecuentes-routing.module';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';


@NgModule({
  declarations: [PreguntasFrecuentesComponent],
  imports: [
    CommonModule,
    PreguntasFrecuentesRoutingModule,
    MatCardModule
  ]
})
export class PreguntasFrecuentesModule { }
