import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuntoEntregaComponent } from './punto-entrega/punto-entrega.component';

const routes: Routes = [
	
	{
		path: '',
		component: PuntoEntregaComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PuntoEntregaRoutingModule { }
