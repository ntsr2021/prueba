import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

import { ComponentModule } from './../../../shared/component/component.module';

import { ReciboRoutingModule } from './recibo-routing.module';

import { ReciboComponent } from './recibo/recibo.component';
import { ConsultaComponent } from './component/consulta/consulta.component';
import { AsignarComponent } from './component/asignar/asignar.component';

@NgModule({
  declarations: [ReciboComponent, ConsultaComponent, AsignarComponent],
  imports: [
    CommonModule,
    ReciboRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ComponentModule,
    FormsModule
  ]
})
export class ReciboModule { }
