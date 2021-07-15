import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { InicioRoutingModule } from './inicio-routing.module';

import { InicioComponent } from './inicio/inicio.component';
import { Navbar1Component } from './component/navbar1/navbar1.component';
import { Navbar2Component } from './component/navbar2/navbar2.component';
import { CierreTiendaComponent } from './component/cierre-tienda/cierre-tienda.component';

import { FooterComponent } from './component/footer/footer.component';

import { ComponentModule } from './../../shared/component/component.module';
import { MenuCategoriaComponent } from './component/menu-categoria/menu-categoria.component';
import { PuntoEntregaComponent } from './component/punto-entrega/punto-entrega.component';
import { ChatComponent } from './component/chat/chat.component';


@NgModule({
  declarations: [InicioComponent, Navbar1Component, Navbar2Component, FooterComponent, MenuCategoriaComponent, PuntoEntregaComponent, CierreTiendaComponent, ChatComponent],
  imports: [
    CommonModule,
    InicioRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    ComponentModule
  ]
})
export class InicioModule { }
