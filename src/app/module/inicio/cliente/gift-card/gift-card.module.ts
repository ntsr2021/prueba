import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { GiftCardRoutingModule } from './gift-card-routing.module';
import { GiftCardComponent } from './gift-card/gift-card.component';
import { ConsultarComponent } from './component/consultar/consultar.component';


@NgModule({
  declarations: [GiftCardComponent, ConsultarComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    GiftCardRoutingModule
  ]
})
export class GiftCardModule { }
