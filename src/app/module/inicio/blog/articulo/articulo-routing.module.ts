import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticuloComponent } from './articulo/articulo.component';


const routes: Routes = [

	{
		path: ':id_articulo_blog',
		component: ArticuloComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticuloRoutingModule { }
