import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

import { CargaMasivaRoutingModule } from './carga-masiva-routing.module';
import { CargaMasivaComponent } from './carga-masiva/carga-masiva.component';
import { PerfumeMultimaxComponent } from './component/perfume-multimax/perfume-multimax.component';
import { ProductoNtsComponent } from './component/producto-nts/producto-nts.component';


@NgModule({
  declarations: [CargaMasivaComponent, PerfumeMultimaxComponent, ProductoNtsComponent],
  imports: [
    CommonModule,
    CargaMasivaRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ]
})
export class CargaMasivaModule { }
