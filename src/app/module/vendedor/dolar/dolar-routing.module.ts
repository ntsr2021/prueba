import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DolarComponent } from './dolar/dolar.component';

const routes: Routes = [
	
	{
		path: '',
		component: DolarComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DolarRoutingModule { }
