import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConectionBdServiceService } from '../../services/conection-bd-service.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-recarga-giftcard',
  templateUrl: './recarga-giftcard.component.html',
  styleUrls: ['./recarga-giftcard.component.css']
})
export class RecargaGiftcardComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder,
              private conectionbdservice: ConectionBdServiceService) { 
    this.crearFormulario();
  }

  ngOnInit(): void {
    
  }

  recarga(){
    
    if ( this.forma.invalid ) {//// activa todos los camops del formulario
      
      return Object.values( this.forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        }else{
          control.markAsTouched();
        }
        
      });
      
    }
     
    
    this.conectionbdservice.recargaTarjeta(this.forma)
    .subscribe(resp => {

      if(resp=='OK'){

        Swal.fire({
          title: `ALERTA TEST`,
          text: `${resp}`,
          imageUrl: 'https://www.ntsstore.com/assets/img/logo2.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        });
        this.forma.reset({ saldo: ''});
        return;
      
      }
      
      Swal.fire({
        
        title: `ALERTA TEST`,
        text: `${resp}`,
        imageUrl: 'https://www.ntsstore.com/assets/img/logo2.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      
      });
    });


  }

  //CARGA EL OBJETO DEL FORMULARIO Y DEFINE LAS VALIDACIONES
  crearFormulario(){
    this.forma = this.fb.group({
      codTarjeta: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$')]],
      saldo: ['', [Validators.required]],
    });
  }

  //DEVOLUCIONES DE LOS ESTADOS DE LOS CAMPOS PARA EL CONTROL DEL FORMULARIO
  get codTarjetaNovalido() {
    return this.forma.get('codTarjeta').invalid && this.forma.get('codTarjeta').touched;
  }

  get saldoNovalido() {
    return this.forma.get('saldo').invalid && this.forma.get('saldo').touched;
  }

  //MANEJO DE LOS ERRORES DEL FORMULARIO
  public getError(controlName: string): string {
    let error:any;
    const control = this.forma.get(controlName);
    if (control.touched && control.errors != null) {
      if(control.errors?.required){
        return 'Campo Requerido';
      }
      if(control.errors?.pattern){
        return 'Error de formato, XXXX-XXXX-XXXX';
      }
      
    }
  }

  
  public carcargFormulario(){
   
    this.forma.reset({
      saldo: '',
      codTarjeta: 'aaaa-aaaa-aaaa'
    });
  
  }

}
