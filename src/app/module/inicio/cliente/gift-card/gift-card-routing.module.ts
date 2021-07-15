import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiftCardComponent } from './gift-card/gift-card.component';


const routes: Routes = [

	{
		path: '',
		component: GiftCardComponent
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftCardRoutingModule { }
