import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaypalComponent } from './paypal/paypal.component';
import { ComisionPaypalComponent } from './comision-paypal/comision-paypal.component';
import { PrefijosTelefonoComponent } from './prefijos-telefono/prefijos-telefono.component';



const routes: Routes = [

	{
		path: '',
		component: PaypalComponent
	},
	{
		path: 'comision',
		component: ComisionPaypalComponent
	},
	{
		path: 'prefijos-telefono',
		component: PrefijosTelefonoComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MocksRoutingModule { }
