import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';


const routes: Routes = [
	
	{
		path: '',
		component: PreguntasFrecuentesComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreguntasFrecuentesRoutingModule { }
