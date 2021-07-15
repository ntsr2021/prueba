import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog/blog.component';


const routes: Routes = [

	{
		path: '',
		component: BlogComponent
	},
	{
		path: 'articulo',
		loadChildren: ()=> import('./articulo/articulo.module').then(m => m.ArticuloModule)
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
