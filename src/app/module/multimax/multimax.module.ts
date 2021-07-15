import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

import { MultimaxComponent } from './multimax/multimax.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { ChatComponent } from './component/chat/chat.component';

import { MultimaxRoutingModule } from './multimax-routing.module';
import { BuscadorComponent } from './component/buscador/buscador.component';


@NgModule({
  declarations: [MultimaxComponent, ProductoDetalleComponent, BuscadorComponent, ChatComponent],
  imports: [
    CommonModule,
    MultimaxRoutingModule,
    MatProgressSpinnerModule,
    FormsModule
  ]
})
export class MultimaxModule { }
