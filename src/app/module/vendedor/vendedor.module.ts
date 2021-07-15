import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';

import { VendedorRoutingModule } from './vendedor-routing.module';
import { VendedorComponent } from './vendedor/vendedor.component';


@NgModule({
  declarations: [VendedorComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    VendedorRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule
  ]
})
export class VendedorModule { }
