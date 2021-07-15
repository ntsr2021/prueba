import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { VendedorComponent } from './vendedor/vendedor.component';
import { VendedorRoutingModule } from './vendedor-routing.module';
import { AgregarComponent } from './component/agregar/agregar.component';
import { EditarComponent } from './component/editar/editar.component';


@NgModule({
  declarations: [VendedorComponent, AgregarComponent, EditarComponent],
  imports: [
    CommonModule,
    VendedorRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ]
})
export class VendedorModule { }
