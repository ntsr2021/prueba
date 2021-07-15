import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoComponent } from './pago/pago.component';

import { MatStepperModule } from '@angular/material/stepper'; // Paginacion del metodo de pago
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio'; // Radio button de angular material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PagoRoutingModule } from './pago-routing.module';

import { DatosComponent } from './component/datos/datos.component';
import { MetodoEntregaComponent } from './component/metodo-entrega/metodo-entrega.component';
import { MetodoPagoModule } from './component/metodo-pago/metodo-pago.module';
import { LimiteTiempoComponent } from './component/limite-tiempo/limite-tiempo.component';
import { ResumenComponent } from './component/resumen/resumen.component';


@NgModule({
  declarations: [PagoComponent, MetodoEntregaComponent, DatosComponent, LimiteTiempoComponent, ResumenComponent],
  imports: [
    CommonModule,
    PagoRoutingModule,
    MatStepperModule,
    FormsModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MetodoPagoModule
  ]
})
export class PagoModule { }
