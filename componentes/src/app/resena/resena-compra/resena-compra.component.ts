import { Component, OnInit } from '@angular/core';
import { ConectionBdServiceService } from '../../services/conection-bd-service.service';
import { MethodsServicesService } from '../../services/methods-services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-resena-compra',
  templateUrl: './resena-compra.component.html',
  styleUrls: ['./resena-compra.component.css']
})
export class ResenaCompraComponent implements OnInit {

  forma: FormGroup;

  constructor(private conectionbdService: ConectionBdServiceService,
              private fb: FormBuilder) { 
                this.crearFormulario();
              }

  ngOnInit(): void {
  }

  crearFormulario(){
    this.forma = this.fb.group({
      calificacion: ['',[Validators.required]],
      resenacompra: ['',[Validators.required, Validators.maxLength(200)]]
    })
  }

  enviar(){
    if (this.forma.invalid ) {//// activa todos los camops del formulario
      
      return Object.values(this.forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        }else{
          control.markAsTouched();
        }
        
      });      
    }

    this.conectionbdService.registraResenaCompra(this.forma)
      .subscribe(resp => {
        if(resp == 'OK'){
          Swal.fire({
            title: `ALERTA TEST`,
            text: 'Reseña Agregada',
            imageUrl: 'https://www.ntsstore.com/assets/img/logo2.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
          return;
        }
        Swal.fire({
          title: `ALERTA TEST`,
          text: 'Ah Ocurrido un Problema',
          imageUrl: 'https://www.ntsstore.com/assets/img/logo2.png',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
      
      });


    this.forma.reset({calificacion:''});
  }

  get calificacionNovalido() {
    return this.forma.get('calificacion').invalid && this.forma.get('calificacion').touched;
  }

  get resenacompraNovalido() {
    return this.forma.get('resenacompra').invalid && this.forma.get('resenacompra').touched;
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
      
    }
  }

}
