import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { DepartamentoComponent } from './departamento/departamento.component';
import { AgregarComponent } from './component/agregar/agregar.component';
import { EditarComponent } from './component/editar/editar.component';
import { DepartamentoRoutingModule } from './departamento-routing.module';


@NgModule({
  declarations: [DepartamentoComponent, AgregarComponent, EditarComponent],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class DepartamentoModule { }
