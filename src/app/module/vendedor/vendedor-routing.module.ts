import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendedorGuard } from './../../shared/guards/vendedor.guard';

import { VendedorComponent } from './vendedor/vendedor.component';

const routes: Routes = [
	
	{
		path: '',
		component: VendedorComponent,
		canActivate: [VendedorGuard],

		children: [
			{
				path:'',
				redirectTo: 'inicio'
			},
			{
				path: 'inicio',
				loadChildren: ()=> import('./inicio/inicio.module').then(m => m.InicioModule)
			},
			{
				path: 'recibo',
				loadChildren: ()=> import('./recibo/recibo.module').then(m => m.ReciboModule)
			},
			{
				path: 'producto',
				loadChildren: ()=> import('./producto/producto.module').then(m => m.ProductoModule)
			},
			{
				path: 'perfume-multimax',
				loadChildren: ()=> import('./perfume-multimax/perfume-multimax.module').then(m => m.PerfumeMultimaxModule)
			},
			{
				path: 'blog',
				loadChildren: ()=> import('./blog/blog.module').then(m => m.BlogModule)
			},
			{
				path: 'dolar',
				loadChildren: ()=> import('./dolar/dolar.module').then(m => m.DolarModule)
			},
			{
				path: 'seguridad',
				loadChildren: ()=> import('./seguridad/seguridad.module').then(m => m.SeguridadModule)
			},

			{
				path: 'cierre-tienda',
				loadChildren: ()=> import('./cierre-tienda/cierre-tienda.module').then(m => m.CierreTiendaModule)
			},

			{
				path: 'banner',
				loadChildren: ()=> import('./banner/banner.module').then(m => m.BannerModule)
			},

			{
				path: 'punto_entrega',
				loadChildren: ()=> import('./punto-entrega/punto-entrega.module').then(m => m.PuntoEntregaModule)
			},
			{
				path: 'cuenta-bancaria',
				loadChildren: ()=> import('./cuenta-bancaria/cuenta-bancaria.module').then(m => m.CuentaBancariaModule)
			},

			{
				path: 'carga-masiva',
				loadChildren: ()=> import('./carga-masiva/carga-masiva.module').then(m => m.CargaMasivaModule)
			},

			{
				path: 'departamento',
				loadChildren: ()=> import('./departamento/departamento.module').then(m => m.DepartamentoModule)
			},

			{
				path: 'usuario',
				loadChildren: ()=> import('./usuario/usuario.module').then(m => m.UsuarioModule)
			}
		]
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})




export class VendedorRoutingModule { }
