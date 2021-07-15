import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalComponent } from './principal/principal.component';


const routes: Routes = [

	{
		path: '',
		component: PrincipalComponent,

		children: [

			{
				path: '',
				loadChildren: ()=> import('./component/producto/producto.module').then(m => m.ProductoModule)
			}

		]
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
