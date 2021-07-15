import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReciboComponent } from './recibo/recibo.component';
import { ConsultaComponent } from './consulta/consulta.component';

const routes: Routes = [
	
	{
		path: '',
		component: ReciboComponent
	},
	{
		path: 'consulta/:id_recibo',
		component: ConsultaComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReciboRoutingModule { }
