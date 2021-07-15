import {Component, OnInit} from '@angular/core';
import {  Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, NgForm, FormControl } from '@angular/forms';

import { ConectionBdServiceService } from '../../services/conection-bd-service.service';

import { Estados } from '../../interface/estados.interfaces';
import Swal from 'sweetalert2'


//se declara $ para tener acceso al libreria selec2 con jquery
declare let $: any;



@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {


  id_estado = 'aqui';
  estados: Estados = null;
  estados2: any = null;
  estadosFilter: any;
  ciudades: any;
  municipios: any;
  parroquias: any;
  @Output() estado: EventEmitter<any>;
  forma: FormGroup;
  otroP = true;

  data = [];

  inicioEstado = "";
  inicioCiudad = "";
  inicioMunicipio = "";
  inicioParroquia = "";
  inicioPais= "";



  constructor(private conectionBdService: ConectionBdServiceService,private fb: FormBuilder) { 
    this.getEstados();
    this.estado = new EventEmitter();
  }
  
 
  ngOnInit(): void {
    this.cargaListaBuscarEstado();
    this.cargaListaBuscarCiudad();
    this.cargaListaBuscarMunicipio();
    this.cargaListaBuscarParroquia();
    this.cargaListaBuscarpais()
    this.crearFormulario("","","","");  

  }

  //**************** enlace para validar los formularios */
  get estadoNovalido() {
    return this.forma.get('estado').invalid && this.forma.get('estado').touched;
  }
  get ciudadNovalido() {
    return this.forma.get('ciudad').invalid && this.forma.get('ciudad').touched;
  }
  get municipioNovalido() {
    return this.forma.get('municipio').invalid && this.forma.get('municipio').touched;
  }
  get parroquiaNovalido() {
    return this.forma.get('parroquia').invalid && this.forma.get('parroquia').touched;
  }
  get direccionNovalido() {
    return this.forma.get('direccion').invalid && this.forma.get('direccion').touched;
  }


  crearFormulario(inicioEstado, inicioCiudad, inicioMunicipio, inicioParroquia){

    //hace falta definir el id_usuario en el formulario, se esta definiendo por defecto como '123' antes de pasarlo por el backend
    
    this.forma = this.fb.group({
      estado: [inicioEstado, [Validators.required]],
      ciudad: [inicioCiudad, [Validators.required]],
      municipio: [inicioMunicipio, [Validators.required]],
      parroquia: [inicioParroquia, [Validators.required]],
      direccion: ['', [Validators.required,Validators.maxLength(100)]],
      pais: [false],
      usuario: ['123', [Validators.required]],
    });
  }
 

  getEstados(){

    this.conectionBdService.getEstados().subscribe(resp => {
      this.estados = resp;

    });
  }
  getCiudades(id_estado){

    if(id_estado==""){
      console.log('en blanco ciudad');
      this.ciudades = [];
      this.forma.reset({
        estado: "",
        ciudad:"",
        municipio:"",
        parroquia:""
      });
      return;
    }
         
    this.conectionBdService.getCiudades(id_estado).subscribe(resp => {
      
       this.ciudades = resp;
      
    });

  }

  getMunicipios(id_estado){

    if(id_estado==""){
      console.log('en blanco muni');
      this.municipios = [];
      this.forma.reset({
        estado: "",
        ciudad:"",
        municipio:"",
        parroquia:""
      });
      return;
    }
    this.conectionBdService.getMunicipios(id_estado).subscribe(resp => {
      this.municipios = resp;
    });
  }

  getParroquias(id_municipio){

    if(id_municipio==""){
      console.log('en blanco Parro');
      this.parroquias = [];
      this.forma.reset({
        estado: "",
        ciudad:"",
        municipio:"",
        parroquia:""
      });
      return;
    }
    this.conectionBdService.getParroquias(id_municipio).subscribe(resp => {
      this.parroquias = resp;
    });
  }

  cargaListaBuscarEstado(){

    $('[name="estado"]').select2();
    $('[name="estado"]').change(()=> {

      this.inicioEstado = $('[name="estado"]').val();      
      this.getCiudades(this.inicioEstado);
      this.getMunicipios(this.inicioEstado);
      this.getParroquias("");
      this.crearFormulario(this.inicioEstado,"","","");

      $(document).ready(function(){
        
        $('[name="estado"]').val($('[name="estado"]').val());

      }); 

    });

  }

  cargaListaBuscarCiudad(){

    $('[name="ciudad"]').select2();
    $('[name="ciudad"]').change(()=> {

      this.inicioCiudad = $('[name="ciudad"]').val();
      this.crearFormulario(this.inicioEstado,this.inicioCiudad,"","");

      $(document).ready(function(){
        
        $('[name="ciudad"]').val($('[name="ciudad"]').val());

      });

    });


  }

  cargaListaBuscarMunicipio(){

    $('[name="municipio"]').select2();
    $('[name="municipio"]').change(()=> {
      
      this.inicioMunicipio = $('[name="municipio"]').val();
      this.getParroquias(this.inicioMunicipio);
      this.crearFormulario(this.inicioEstado,this.inicioCiudad,this.inicioMunicipio,"");
      $(document).ready(function(){
        
        $('[name="municipio"]').val($('[name="municipio"]').val());

      });
    });
  }


  cargaListaBuscarParroquia(){
    $('[name="parroquia"]').select2();
    $('[name="parroquia"]').change(()=> {

      this.inicioParroquia = $('[name="parroquia"]').val();
      this.crearFormulario(this.inicioEstado,this.inicioCiudad,this.inicioMunicipio,this.inicioParroquia);
      $(document).ready(function()
      {

        $('[name="parroquia"]').val($('[name="parroquia"]').val());
      
      });

    });
  }

  cargaListaBuscarpais(){
    $('[name="pais"]').select2();
    $('[name="pais"]').change(()=> {

      this.inicioPais = $('[name="pais"]').val();
            $(document).ready(function() {
        
        $('[name="pais"]').val($('[name="pais"]').val());
      
      });

    });
  }

  cambio(asd){

    console.log(asd);
    this.otroP = !this.otroP;
    if(this.otroP){
      this.forma.controls['estado'].enable();
      this.forma.controls['ciudad'].enable();
      this.forma.controls['municipio'].enable();
      this.forma.controls['parroquia'].enable();
      return;
      
    }
    
    this.forma.controls['estado'].disable();
    this.forma.controls['ciudad'].disable();
    this.forma.controls['municipio'].disable();
    this.forma.controls['parroquia'].disable();
  }
  enviar(){

    //// activa todos los campos del formulario cuando no se ha tocado para poder validarlos
    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {

        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        }else{
          control.markAsTouched();
        }

      });

    }

    this.conectionBdService.enviarDireccion(this.forma).subscribe( resp => {
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
    
      // this.crearFormulario()
      
      
    });
    this.forma.controls['estado'].enable();
    this.forma.controls['ciudad'].enable();
    this.forma.controls['municipio'].enable();
    this.forma.controls['parroquia'].enable();
    this.forma.setValue['estado']="";
    this.estados = null;
    this.ciudades = [];
    this.municipios = [];
    this.parroquias = [];
    
    this.otroP = true;
    this.crearFormulario("","","","");
    this.getEstados();
    
    
  }

  //manejo de los errores en el formulario
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
