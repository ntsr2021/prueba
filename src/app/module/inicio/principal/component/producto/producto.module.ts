import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProductoRoutingModule } from './producto-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './component/producto/producto.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { BtnSubirScrollComponent } from './component/btn-subir-scroll/btn-subir-scroll.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { RecientesComponent } from './recientes/recientes.component';
import { BuscarComponent } from './buscar/buscar.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { MasVendidosComponent } from './mas-vendidos/mas-vendidos.component';


@NgModule({
  declarations: [InicioComponent, ProductoComponent, SpinnerComponent, BtnSubirScrollComponent, PromocionesComponent, RecientesComponent, BuscarComponent, CategoriaComponent, MasVendidosComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MatProgressSpinnerModule
  ]
})
export class ProductoModule { }
