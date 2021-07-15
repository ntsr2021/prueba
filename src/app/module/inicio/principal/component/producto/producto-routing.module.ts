import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { RecientesComponent } from './recientes/recientes.component';
import { BuscarComponent } from './buscar/buscar.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { MasVendidosComponent } from './mas-vendidos/mas-vendidos.component';


const routes: Routes = [

	{
		path: '',
		component: InicioComponent
	},

	{
		path: 'recientes',
		component: RecientesComponent
	},

	{
		path: 'promociones',
		component: PromocionesComponent
	},

	{
		path: 'buscar/:busq',
		component: BuscarComponent
	},
	
	{
		path: 'categoria/:departamentos',
		component: CategoriaComponent
	},

	{
		path: 'mas-vendidos',
		component: MasVendidosComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
