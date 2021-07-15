import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



import { GiftCardModule } from './gift-card/gift-card.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ResenaModule } from './resena/resena.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { TranslateComponent } from './translate/translate.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TranslateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GiftCardModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ResenaModule,
    NoopAnimationsModule,
    DropdownModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
