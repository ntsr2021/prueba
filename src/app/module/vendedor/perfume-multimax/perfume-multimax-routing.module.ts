import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfumeMultimaxComponent } from './perfume-multimax/perfume-multimax.component';

const routes: Routes = [
	
	{
		path: '',
		component: PerfumeMultimaxComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfumeMultimaxRoutingModule { }
