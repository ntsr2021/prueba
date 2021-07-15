import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { DatosComponent } from './datos/datos.component';
import { SeguridadComponent } from './seguridad/seguridad.component';



const routes: Routes = [
	
	{
		path: '',
		component: ClienteComponent,
		

		children: [

			{
				path:'',
				redirectTo: 'recibo'
			},

			{
				path: 'recibo',
				loadChildren: ()=> import('./recibo/recibo.module').then(m => m.ReciboModule)
			},

			{
				path: 'gift-card',
				loadChildren: ()=> import('./gift-card/gift-card.module').then(m => m.GiftCardModule)
			},

			{
				path: 'datos',
				component: DatosComponent
			},

			{
				path: 'seguridad',
				component: SeguridadComponent
			}
		]
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
