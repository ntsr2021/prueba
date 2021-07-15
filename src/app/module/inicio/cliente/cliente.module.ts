import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { DatosComponent } from './datos/datos.component';
import { SeguridadComponent } from './seguridad/seguridad.component';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [ClienteComponent, DatosComponent, SeguridadComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports: [DatosComponent]
})
export class ClienteModule { }
