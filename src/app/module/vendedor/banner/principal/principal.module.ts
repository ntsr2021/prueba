import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';

import { PrincipalRoutingModule } from './principal-routing.module';


@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    PrincipalRoutingModule
  ],
  exports: [PrincipalComponent]
})
export class PrincipalModule { }
