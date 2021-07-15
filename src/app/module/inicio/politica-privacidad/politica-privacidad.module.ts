import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { PoliticaPrivacidadRoutingModule } from './politica-privacidad-routing.module';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';


@NgModule({
  declarations: [PoliticaPrivacidadComponent],
  imports: [
    CommonModule,
    PoliticaPrivacidadRoutingModule,
    MatCardModule
  ]
})
export class PoliticaPrivacidadModule { }
