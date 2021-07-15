import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DolaresComponent } from './dolares/dolares.component';
import { BolivaresComponent } from './bolivares/bolivares.component';
import { PagoMovilComponent } from './pago-movil/pago-movil.component';
import { EfectivoComponent } from './efectivo/efectivo.component';
import { MetodoPagoComponent } from './metodo-pago/metodo-pago.component';

import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio'; // Radio button de angular material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PagoMixtoModule } from './pago-mixto/pago-mixto.module';
import { GiftCardComponent } from './gift-card/gift-card.component';
import { PaypalComponent } from './paypal/paypal.component';



@NgModule({
  declarations: [BolivaresComponent, PagoMovilComponent, EfectivoComponent, MetodoPagoComponent, DolaresComponent, GiftCardComponent, PaypalComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    PagoMixtoModule
  ],
  exports: [MetodoPagoComponent]
})
export class MetodoPagoModule { }
