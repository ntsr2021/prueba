import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog/blog.component';
import { AgregarComponent } from './component/agregar/agregar.component';
import { EditarComponent } from './component/editar/editar.component';


const routes: Routes = [

	{
		path: '',
		component: BlogComponent
	},
	{
		path: 'nuevo-articulo',
		component: AgregarComponent
	},
	{
		path: 'editar/:id_articulo_blog',
		component: EditarComponent
	},
	{
		path: 'comentarios/:id_articulo_blog',
		loadChildren: ()=> import('./comentarios/comentarios.module').then(m => m.ComentariosModule)
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
