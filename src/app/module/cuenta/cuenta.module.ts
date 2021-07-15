import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CuentaComponent } from './cuenta/cuenta.component';
import { VerificarCorreoComponent } from './verificar-correo/verificar-correo.component';

@NgModule({
  declarations: [LoginComponent, RegistroComponent, RecuperacionComponent, CuentaComponent, VerificarCorreoComponent],
  imports: [
    CommonModule,
    CuentaRoutingModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    FormsModule
  ]
})
export class CuentaModule { }
