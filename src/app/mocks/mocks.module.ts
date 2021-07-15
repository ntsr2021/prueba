import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MocksRoutingModule } from './mocks-routing.module';
import { FormsModule } from '@angular/forms';
import { PaypalComponent } from './paypal/paypal.component';
import { ComisionPaypalComponent } from './comision-paypal/comision-paypal.component';
import { PrefijosTelefonoComponent } from './prefijos-telefono/prefijos-telefono.component';



@NgModule({
  declarations: [ComisionPaypalComponent, PrefijosTelefonoComponent],
  imports: [
    CommonModule,
    MocksRoutingModule,
    FormsModule
  ]
})
export class MocksModule { }
