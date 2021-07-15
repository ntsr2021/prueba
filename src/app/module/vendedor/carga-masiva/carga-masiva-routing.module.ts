import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargaMasivaComponent } from './carga-masiva/carga-masiva.component';

const routes: Routes = [
	
	{
		path: '',
		component: CargaMasivaComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargaMasivaRoutingModule { }
