import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule} from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

import { ResenaProductoComponent } from './resena-producto/resena-producto.component';
import { ResenaCompraComponent } from './resena-compra/resena-compra.component';
import { ConsResenaCompraComponent } from './cons-resena-compra/cons-resena-compra.component';
import { ConsResenaProductoComponent } from './cons-resena-producto/cons-resena-producto.component';
import { ConsResenaCompra2Component } from './cons-resena-compra2/cons-resena-compra2.component';




@NgModule({
  declarations: [
    ResenaProductoComponent, 
    ResenaCompraComponent, 
    ConsResenaCompraComponent, 
    ConsResenaProductoComponent, 
    ConsResenaCompra2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule
    
    
  ]
})
export class ResenaModule { }
