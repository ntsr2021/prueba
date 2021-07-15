import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarroComponent } from './carro/carro.component';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';

import { CarroRoutingModule } from './carro-routing.module';


@NgModule({
  declarations: [CarroComponent],
  imports: [
    CommonModule,
    CarroRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ]
})
export class CarroModule { }
