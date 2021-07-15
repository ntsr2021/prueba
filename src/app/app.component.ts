import { Component, OnInit } from '@angular/core';
import { ProductoService } from './shared/service/producto.service';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nts-store';

  prodCarro = JSON.parse(localStorage.getItem('prodCarro'));
   

  constructor(private productoService: ProductoService){}


  ngOnInit(): void {
    
    // this.veriActualizacionInventario();

    
  	$('#ftco-loader').fadeOut(100); // Ocultar animacion loading

  	$(document).on('click','[routerLink]', function(e){ // Permite subir el scroll cada vez que se presione un link con routerLink
  	  
      window.scroll(0, 0);
      
  	});

  }



  // veriActualizacionInventario()
  // {

  //   if(this.prodCarro != null)
  //   {
  //     this.productoService.veriActualizacionInventario(this.prodCarro).subscribe(resp => 
  //     {
  //       if(resp['veriActualizacion'] == true)
  //       {
  //         this.prodCarro = JSON.stringify(resp['carroCompraNuevo']);
  //         localStorage.setItem('prodCarro', this.prodCarro);
  //       }
  //     });
  //   }
  // }


}