import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiftCardModule } from './gift-card/gift-card.module';
import { GiftCardComponent } from './gift-card/gift-card/gift-card.component';
import { RecargaGiftcardComponent } from './gift-card/recarga-giftcard/recarga-giftcard.component';
import { ResenaCompraComponent } from './resena/resena-compra/resena-compra.component';
import { ResenaProductoComponent } from './resena/resena-producto/resena-producto.component';
import { ConsResenaCompra2Component } from './resena/cons-resena-compra2/cons-resena-compra2.component';
import { ConsResenaProductoComponent } from './resena/cons-resena-producto/cons-resena-producto.component';
import { ConsResenaCompraComponent } from './resena/cons-resena-compra/cons-resena-compra.component';
import { EstadosComponent } from './dropdown/estados/estados.component';


const routes: Routes = [

  { path: 'giftcard', component: GiftCardComponent },
  { path: 'recarga', component: RecargaGiftcardComponent },
  { path: 'resenacompra', component: ResenaCompraComponent },
  { path: 'resenaproducto', component: ResenaProductoComponent },
  { path: 'consresenacompra', component: ConsResenaCompraComponent },
  { path: 'material', component: ConsResenaCompraComponent },
  { path: 'consresenaproducto', component: ConsResenaProductoComponent },
  { path: 'estados', component: EstadosComponent },
  { path: '', redirectTo: '/giftcard', pathMatch: 'full' },
  { path: '**', component: GiftCardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            GiftCardModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
