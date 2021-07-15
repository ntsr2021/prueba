import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MarcaComponent } from './marca/marca.component';

import { MarcaRoutingModule } from './marca-routing.module';
import { AgregarComponent } from './component/agregar/agregar.component';
import { EditarComponent } from './component/editar/editar.component';


@NgModule({
  declarations: [MarcaComponent, AgregarComponent, EditarComponent],
  imports: [
    CommonModule,
    MarcaRoutingModule,
    FormsModule
  ],
  exports: [MarcaComponent, AgregarComponent, EditarComponent]
})
export class MarcaModule { }
