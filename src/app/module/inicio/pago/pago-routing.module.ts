import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoComponent } from './pago/pago.component';
import { ClienteGuard } from './../../../shared/guards/cliente.guard';

const routes: Routes = [
	
	{
		path: '',
		component: PagoComponent,
		canActivate: [ClienteGuard]
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagoRoutingModule { }
