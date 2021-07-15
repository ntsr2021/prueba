import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms'; // Prueba

import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { Page404Component } from './page404/page404.component';



@NgModule({
  declarations: [
    AppComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule // Prueba
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  
}



