import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendasComponent } from './tiendas/tiendas.component';

const routes: Routes = [
	
	{
		path: '',
		component: TiendasComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendasRoutingModule { }
