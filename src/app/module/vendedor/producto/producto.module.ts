import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { ProductoRoutingModule } from './producto-routing.module';

import { ProductoComponent } from './producto/producto.component';
import { RegistroComponent } from './component/registro/registro.component';
import { EditarComponent } from './component/editar/editar.component';
import { FotoComponent } from './component/foto/foto.component';



@NgModule({
  declarations: [ProductoComponent, RegistroComponent, EditarComponent, FotoComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class ProductoModule { }
