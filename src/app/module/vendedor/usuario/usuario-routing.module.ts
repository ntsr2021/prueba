import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
	
	{
		path: '',
		component: UsuarioComponent,
		children: [
			{
				path: '',
				loadChildren: ()=> import('./cliente/cliente.module').then(m => m.ClienteModule)
			},
			{
				path: 'vendedor',
				loadChildren: ()=> import('./vendedor/vendedor.module').then(m => m.VendedorModule)
			}
		]
	}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
