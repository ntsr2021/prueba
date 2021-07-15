import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';


const routes: Routes = [

	{
		path: '',
		component: PoliticaPrivacidadComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliticaPrivacidadRoutingModule { }
