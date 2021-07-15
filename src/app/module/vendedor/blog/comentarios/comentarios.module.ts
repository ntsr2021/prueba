import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComentariosComponent } from './comentarios/comentarios.component';
import { ResponderComponent } from './component/responder/responder.component';

import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { ComentariosRoutingModule } from './comentarios-routing.module';
import { ComentarComponent } from './component/comentar/comentar.component';


@NgModule({
  declarations: [ComentariosComponent, ResponderComponent, ComentarComponent],
  imports: [
    CommonModule,
    ComentariosRoutingModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class ComentariosModule { }
