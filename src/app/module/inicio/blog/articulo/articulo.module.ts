import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button'; 

import { ArticuloRoutingModule } from './articulo-routing.module';
import { ArticuloComponent } from './articulo/articulo.component';
import { ComentarioComponent } from './component/comentario/comentario.component';


import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ArticuloComponent, ComentarioComponent],
  imports: [
    CommonModule,
    ArticuloRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class ArticuloModule { }
