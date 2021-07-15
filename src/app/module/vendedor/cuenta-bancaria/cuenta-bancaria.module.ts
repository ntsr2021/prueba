import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { CuentaBancariaComponent } from './cuenta-bancaria/cuenta-bancaria.component';
import { CuentaBancariaRoutingModule } from './cuenta-bancaria-routing.module';
import { AgregarComponent } from './component/agregar/agregar.component';
import { EditarComponent } from './component/editar/editar.component';

import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [CuentaBancariaComponent, AgregarComponent, EditarComponent],
  imports: [
    CommonModule,
    CuentaBancariaRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatTabsModule
  ]
})
export class CuentaBancariaModule { }
