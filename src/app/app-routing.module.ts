import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page404Component } from './page404/page404.component';

// Guards

import { VendedorGuard } from './shared/guards/vendedor.guard';
import { MultimaxGuard } from './shared/guards/multimax.guard';

///////////////



const routes: Routes = [
	
	{
		path: '',
		loadChildren: () => import('./module/inicio/inicio.module').then(m => m.InicioModule)
	},
	
	{
		path: 'cuenta',
		loadChildren: ()=> import('./module/cuenta/cuenta.module').then(m => m.CuentaModule)
	},
	{
		path: 'login',
		loadChildren: () => import('./module/login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'vendedor',
		loadChildren: () => import('./module/vendedor/vendedor.module').then(m => m.VendedorModule),
		canActivate: [VendedorGuard]
	},
	{
		path: 'multimax',
		loadChildren: () => import('./module/multimax/multimax.module').then(m => m.MultimaxModule),
		canActivate: [MultimaxGuard]
	},

	{
		path: 'prueba',
		loadChildren: () => import('./mocks/mocks.module').then( m => m.MocksModule )
	},

	{
		path: '**',
		component: Page404Component
	}
];



@NgModule({  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }