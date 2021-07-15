import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftCardComponent } from './gift-card/gift-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecargaGiftcardComponent } from './recarga-giftcard/recarga-giftcard.component';



@NgModule({
  declarations: [GiftCardComponent, RecargaGiftcardComponent],
  exports: [
    GiftCardComponent,
    RecargaGiftcardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class GiftCardModule { }
