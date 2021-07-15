import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoComponent } from './producto/producto.component';
import { FotoComponent } from './component/foto/foto.component';

const routes: Routes = [
	
	{
		path: '',
		component: ProductoComponent
	},
	{
		path: 'foto/:id_producto',
		component: FotoComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
