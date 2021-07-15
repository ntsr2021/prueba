import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio'; // Radio button de angular material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PagoMixtoComponent } from './pago-mixto/pago-mixto.component';
import { BolivaresComponent } from './component/bolivares/bolivares.component';
import { DolaresComponent } from './component/dolares/dolares.component';
import { EfectivoComponent } from './component/efectivo/efectivo.component';
import { PagoMovilComponent } from './component/pago-movil/pago-movil.component';
import { GiftCardComponent } from './component/gift-card/gift-card.component';
import { PaypalComponent } from './component/paypal/paypal.component';


@NgModule({
  declarations: [
  	PagoMixtoComponent,
  	BolivaresComponent,
  	DolaresComponent,
  	EfectivoComponent,
  	PagoMovilComponent,
  	GiftCardComponent,
  	PaypalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  exports: [
  	PagoMixtoComponent
  ]
})
export class PagoMixtoModule { }
