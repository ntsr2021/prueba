import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProDetalleComponent } from './pro-detalle/pro-detalle.component';

const routes: Routes = [
	
	{
		path: '',
		component: ProDetalleComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
