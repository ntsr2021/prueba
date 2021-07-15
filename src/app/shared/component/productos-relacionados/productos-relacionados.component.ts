import { Component, OnInit, Input } from '@angular/core';

import { ProductoService } from './../../service/producto.service';

declare var $:any;


@Component({
  selector: 'app-productos-relacionados',
  templateUrl: './productos-relacionados.component.html',
  styleUrls: ['./productos-relacionados.component.css']
})
export class ProductosRelacionadosComponent implements OnInit {

	@Input() id_producto = null;
	itemSlide = null;


  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
  	this.consProductosRelacionados();
  }


  consProductosRelacionados()
  {
  	this.productoService.consRelacionados(this.id_producto).subscribe(resp => 
  	{
      let itemSlide:any = resp;


      if(itemSlide.length > 0)
      {
  		  this.itemSlide = resp;


        // Iniciar carrousel
        setTimeout(()=> $('#productos-relacionados-carrousel .carousel-item:first').addClass('active'), 300)

      }
      else 
        this.itemSlide = -1;
  	})
  }

}
