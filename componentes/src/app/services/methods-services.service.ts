import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MethodsServicesService {

  constructor() { }


  touchForm(forma: FormGroup){

    if (forma.invalid ) {//// activa todos los camops del formulario
      return Object.values(forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        }else{
          control.markAsTouched();
        }
        
      });      
    }
  
  }
}


