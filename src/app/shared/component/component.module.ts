import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProDetalleComponent } from './pro-detalle/pro-detalle.component';
import { ComponentRoutingModule } from './component-routing.module';
import { GenerarReciboComponent } from './generar-recibo/generar-recibo.component';
import { ProResenaComponent } from './pro-resena/pro-resena.component';
import { ProductosRelacionadosComponent } from './productos-relacionados/productos-relacionados.component';
import { ProductoComponent } from './producto/producto.component';

@NgModule({
  declarations: [ProDetalleComponent, GenerarReciboComponent, ProResenaComponent, ProductosRelacionadosComponent, ProductoComponent],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    FormsModule
  ],
  exports: [GenerarReciboComponent]
})
export class ComponentModule { }
