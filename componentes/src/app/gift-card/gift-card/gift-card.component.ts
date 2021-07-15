import { Component, OnInit } from '@angular/core';
import { ConectionBdServiceService } from 'src/app/services/conection-bd-service.service';
import { FormGroup, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { PresentacionGiftCard } from '../../interface/giftCard-response';
import { catchError } from 'rxjs/operators';



@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {

  forma: FormGroup;
  giftCardPre: PresentacionGiftCard;
  nombre: String;
  error: String = '';
  imgSelec: String = 'presentacion1.png';
  mensaje0: String = '¡Error!';


  constructor(private conectionBdServices: ConectionBdServiceService, 
              private fb: FormBuilder){ 
    this.crearFormulario();
  }
  
  
  ngOnInit(): void {
    this.consultarPresentacionGiftcard();
    this.cargarFormulario();
  }

  //crear los campos para el formulario reactivo
  crearFormulario(){
    this.forma = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(40)]],
      nombreRemitente: ['', [Validators.required, Validators.maxLength(80),Validators.pattern('[a-zA-Z ]*')]],
      mensaje: ['', [Validators.required, Validators.maxLength(200)]],
      gftcard: ['',Validators.required],
      saldo: ['', [Validators.required]],
      ntarjetas: ['', [Validators.required,Validators.pattern('[1-9]'), Validators.max(5)]],
    });
  }
  guardar(){
    if ( this.forma.invalid ) {//// activa todos los camops del formulario

      return Object.values( this.forma.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        }else{
          control.markAsTouched();
        }

      });

    }
  
    this.conectionBdServices.insertarGiftcard(this.forma)
    .subscribe(resp => {

      if(resp=='OK'){

        Swal.fire({
          title: `ALERTA TEST`,
          text: `${resp}`,
          imageUrl: 'https://www.ntsstore.com/assets/img/logo2.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
        this.forma.reset({saldo:''});
        return;
      }
      Swal.fire({
        title: `ALERTA TEST`,
        text: `${this.mensaje0}`,
        imageUrl: 'https://www.ntsstore.com/assets/img/logo2.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    });
  }

  consultarPresentacionGiftcard(){
    this.conectionBdServices.consulta_presentacion_giftCard()
        .subscribe(resp =>{
          this.giftCardPre = resp;
        });
  }

  nombreImagen(){
    
    return this.forma.get('gftcard').valueChanges.subscribe(console.log);
  
  }

  selecImg(imgSelec){
    
    this.imgSelec = imgSelec;
 
  }

  get tituloNovalido() {
    
    return this.forma.get('titulo').invalid && this.forma.get('titulo').touched;
  
  }

  get nombreRemitenteNovalido() {
    
    return this.forma.get('nombreRemitente').invalid && this.forma.get('nombreRemitente').touched;
  
  }

  get mensajeNovalido() {
    
    return this.forma.get('mensaje').invalid && this.forma.get('mensaje').touched;
  
  }

  get gftcardNovalido() {
   
    return this.forma.get('gftcard').invalid && this.forma.get('gftcard').touched;
    
  }
  
  get saldoNovalido() {
    
    return this.forma.get('saldo').invalid && this.forma.get('saldo').touched;
  
  }

  get ntarjetasNovalido() {
    
    return this.forma.get('ntarjetas').invalid && this.forma.get('ntarjetas').touched;
  
  }


  public getError(controlName: string): string {
    
    let error:any;
    const control = this.forma.get(controlName);
   
    if (control.touched && control.errors != null) {
     
      if(control.errors?.required){
        
        return 'Campo Requerido';
      
      }
      
      if(control.errors?.maxlength){
        
        return 'Máximo Alcanzado';
      
      }
      if(control.errors?.pattern){
       
        return 'Error de formato';
      
      }
      if(control.errors?.max){
       
        return 'Máximo Alcanzado';
      
      }
      
    }
  }
  cargarFormulario(){
    
    this.forma.reset({saldo:''});
    
  }
}
