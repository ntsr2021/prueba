import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarcaComponent } from './marca/marca.component';

const routes: Routes = [

	{
		path: '',
		component: MarcaComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcaRoutingModule { }
