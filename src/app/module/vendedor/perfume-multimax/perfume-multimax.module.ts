import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfumeMultimaxComponent } from './perfume-multimax/perfume-multimax.component';

import { PerfumeMultimaxRoutingModule } from './perfume-multimax-routing.module';

import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [PerfumeMultimaxComponent],
  imports: [
    CommonModule,
    PerfumeMultimaxRoutingModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class PerfumeMultimaxModule { }
