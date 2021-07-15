import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { PagoGuard } from './../../shared/guards/pago.guard';
import { ClienteGuard } from './../../shared/guards/cliente.guard';
import { BlogGuard } from './../../shared/guards/blog.guard';

const routes: Routes = [
	
	{
		path: '',
		component: InicioComponent,
		children: [
			{
				path: '',
				loadChildren: ()=> import('./principal/principal.module').then(m => m.PrincipalModule)
			},
			{
				path: 'nosotros',
				loadChildren: ()=> import('./nosotros/nosotros.module').then(m => m.NosotrosModule)
			},
			
			{
				path: 'cliente',
				loadChildren: ()=> import('./cliente/cliente.module').then(m => m.ClienteModule),
				canActivate: [ClienteGuard]
			},
			{
				path: 'detalle/:id_producto',
				loadChildren: () => import('./../../shared/component/component.module').then(m => m.ComponentModule)
			},
			{
				path: 'carro',
				loadChildren: () => import('./carro/carro.module').then(m => m.CarroModule)
			},
			{
				path: 'pago',
				loadChildren: () => import('./pago/pago.module').then(m => m.PagoModule),
				canDeactivate: [PagoGuard],
				canActivate: [PagoGuard]
			},
			{
				path: 'tiendas',
				loadChildren: () => import('./tiendas/tiendas.module').then(m => m.TiendasModule)
			},
			{
				path: 'blog',
				loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule),
				canDeactivate: [BlogGuard]
			},
			{
				path: 'terminos-condiciones',
				loadChildren: () => import('./terminos-condiciones/terminos-condiciones.module').then(m => m.TerminosCondicionesModule)
			},
			{
				path: 'politica-privacidad',
				loadChildren: () => import('./politica-privacidad/politica-privacidad.module').then(m => m.PoliticaPrivacidadModule)
			},
			{
				path: 'preguntas-frecuentes',
				loadChildren: () => import('./preguntas-frecuentes/preguntas-frecuentes.module').then(m => m.PreguntasFrecuentesModule)
			}
		]
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
