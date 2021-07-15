import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CierreTiendaComponent } from './cierre-tienda/cierre-tienda.component';
import { FormsModule } from '@angular/forms';

import { CierreTiendaRoutingModule } from './cierre-tienda-routing.module';


@NgModule({
  declarations: [CierreTiendaComponent],
  imports: [
    CommonModule,
    CierreTiendaRoutingModule,
    FormsModule
  ]
})
export class CierreTiendaModule { }
