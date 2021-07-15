import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { TerminosCondicionesRoutingModule } from './terminos-condiciones-routing.module';
import { TerminosCondicionesComponent } from './terminos-condiciones/terminos-condiciones.component';


@NgModule({
  declarations: [TerminosCondicionesComponent],
  imports: [
    CommonModule,
    TerminosCondicionesRoutingModule,
    MatCardModule
  ]
})
export class TerminosCondicionesModule { }
