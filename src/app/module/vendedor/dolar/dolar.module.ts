import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DolarRoutingModule } from './dolar-routing.module';

import { DolarComponent } from './dolar/dolar.component';

@NgModule({
  declarations: [DolarComponent],
  imports: [
    CommonModule,
    DolarRoutingModule,
    FormsModule
  ]
})
export class DolarModule { }
