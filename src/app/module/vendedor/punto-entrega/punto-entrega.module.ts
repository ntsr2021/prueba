import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { PuntoEntregaComponent } from './punto-entrega/punto-entrega.component';
import { PuntoEntregaRoutingModule } from './punto-entrega-routing.module';
import { AgregarComponent } from './component/agregar/agregar.component';
import { EditarComponent } from './component/editar/editar.component';


@NgModule({
  declarations: [PuntoEntregaComponent, AgregarComponent, EditarComponent],
  imports: [
    CommonModule,
    PuntoEntregaRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ]
})
export class PuntoEntregaModule { }
