import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { ComponentModule } from './../../../../shared/component/component.module';

import { ReciboComponent } from './recibo/recibo.component';
import { ReciboRoutingModule } from './recibo-routing.module';
import { ConsultaComponent } from './consulta/consulta.component';

@NgModule({
  declarations: [ReciboComponent, ConsultaComponent],
  imports: [
    CommonModule,
    ReciboRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ComponentModule
  ]
})
export class ReciboModule { }
