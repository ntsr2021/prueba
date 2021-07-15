import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultimaxComponent } from './multimax/multimax.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';


const routes: Routes = [
	
	{
		path: '',
		component: MultimaxComponent
	},

	{
		path: 'detalle/:id_producto',
		component: ProductoDetalleComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})




export class MultimaxRoutingModule { }
