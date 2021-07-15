import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CierreTiendaComponent } from './cierre-tienda/cierre-tienda.component';

const routes: Routes = [
	
	{
		path: '',
		component: CierreTiendaComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CierreTiendaRoutingModule { }
