import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SeguridadComponent } from './seguridad/seguridad.component';
import { SeguridadRoutingModule } from './seguridad-routing.module';


@NgModule({
  declarations: [SeguridadComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule
  ]
})
export class SeguridadModule { }
