import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from "@angular/router";

import { ProductoFotoService } from '../../service/producto-foto.service';
import { ProductoService } from '../../service/producto.service';
import { DolarService } from '../../service/dolar.service';
import { UserService } from '../../service/user.service';

import { FormatoMoneda } from '../../helper/formato-moneda';

declare var $:any;
declare var Drift:any;


@Component({
  selector: 'app-pro-detalle',
  templateUrl: './pro-detalle.component.html',
  styleUrls: ['./pro-detalle.component.css']
})
export class ProDetalleComponent implements OnInit 
{


  producto = {
    id_producto: null,
    codigo: null,
    cat1: null,
    cat2: null,
    nombre: null,
    foto_prin: null,
    precio: null,
    iva: null,
    can_comprar: null,
    can_original: null,
    descripcion: null
  }

  fotos = null;
  prodCarro: any = JSON.parse(window.localStorage.getItem('prodCarro'));
  dolar = 0;
  bandProdAgregado = null;

  user = null;
  jwt = {
    token: null
  }

  btnAgregarActivado = false;


  constructor(private activatedRoute: ActivatedRoute, 
            private router : Router, 
            private productoFotoService: ProductoFotoService, 
  					private productoService: ProductoService, 
            private dolarService: DolarService,
            private userService: UserService,
            public formatoMoneda: FormatoMoneda) {}


  ngOnInit() {
    this.consDolar();

		this.activatedRoute.paramMap.subscribe((params: ParamMap) => 
		{
			this.producto.id_producto = params.get('id_producto');
		});


    // Verificar si el usuario ha iniciado sesión
    this.jwt.token = localStorage.getItem('tokenCliente');
    if(this.jwt.token != null && this.jwt.token != undefined)
    {
      this.userService.consultar(this.jwt).subscribe(resp => {
        this.user = resp;

        this.consProducto();
      })
    }else 
    {
      this.consProducto();
    }
  }


  // Consultar valor del dolar
  consDolar() {
    this.dolarService.consultarOne().subscribe(resp => this.dolar = parseFloat(resp['valor']))
  }


  // Consultar fotos del producto
  consFoto() // elastislide-vertical
  {  
    this.productoFotoService.consultar(this.producto.id_producto).subscribe(res => 
    {
      this.fotos = res;

      setTimeout(()=> 
      {
        $( '#carousel-detalle' ).elastislide({ // Definir la orientacion de la lista de fotos del producto
          orientation : 'vertical'
        });


        // Setear height para el contenedor de la lista de imgs
        let height = 0;

        if(this.fotos != null)
        {
          if(this.fotos.length < 3)
            height = (this.fotos.length+1) * 175;
          else 
            height = 525;
        }else 
          height = 175;

        
        setTimeout(()=> $('.elastislide-vertical').attr('style', 'height: '+height+'px !important;overflow-y: hidden !important'), 50 );



        // Añadir el atributo data-zoom mediante jquery a la img del elemento visor debido a que angular no reconoce el atributo como parte del objeto img
        $('#visor img').attr('data-zoom', $('#foto-prin').attr('src') + '?w=1200&amp;ch=DPR&amp;dpr=2');

        this.selecImgLista(); // Script para seleccionar una img de la lista y añadirla al visor
        this.expandirImgVisor(); // Añadir script para expandir img del visor

      }, 100)
    });
  }


  // Consultar datos del producto
  consProducto() 
  {
    this.productoService.consUno(this.producto.id_producto).subscribe(resp => 
    {
      this.producto.codigo = resp['codigo'];

      this.producto.cat1 = resp['cat1'];
      this.producto.cat2 = resp['cat2'];

      this.producto.nombre = resp['nombre'];
      this.producto.precio = resp['precio'];
      this.producto.can_original = resp['cantidad'];

      this.producto.foto_prin = resp['foto_prin'];
      this.producto.descripcion = resp['descripcion'];


      // Verifica si el producto ya a sido agregado, de ser asi agrega al producto actual la cantidad q ya ha sido agregada
      let ind = this.veriProdAgregado();
      if(ind != null)
        this.producto.can_comprar = this.prodCarro[ind].can_comprar; 
      else
        this.producto.can_comprar = 1; 



      this.consFoto();

      // Añadir saltos de linea a la descripcion del producto
      $('#pro-descripcion').html((this.producto.descripcion.split("\n").join("<br />")));
    })
  }


  // Mostrar imagen seleccionada en el visor
  selecImgLista()
  {
    $('#carousel-detalle img').click(function(e)
    {
      e.preventDefault();

      let urlImgIrVisor = $(this).attr('src') + '?w=400&amp;ch=DPR&amp;dpr=2'; // Url de la img seleccionada q sera incluida en el visor
      let urlImgIrZomm = $(this).attr('src') + '?w=1200&amp;ch=DPR&amp;dpr=2'; // Url de la img seleccionada q sera incluida en el zoom del visor


      $('#visor-img').attr('src', urlImgIrVisor).attr('data-zoom', urlImgIrZomm);
    });    

    // Crear visor
    new Drift(document.querySelector('.drift-demo-trigger'), {
      paneContainer: document.querySelector('.detail'),
      inlinePane: 900,
      inlineOffsetY: -85,
      containInline: true,
      hoverBoundingBox: true
    });
  }


  // Totales 
  total$() 
  {
    let precio = parseFloat(this.producto.precio);
    let cantidad = this.producto.can_comprar;

    return (precio + (precio * 0.16) * cantidad).toFixed(2);
  }

  totalBs() 
  {
    let precio = parseFloat(this.producto.precio);
    let cantidad = this.producto.can_comprar;

    return (precio + (precio * 0.16) * cantidad * this.dolar).toFixed(2);
  }



  agregar()
  {
    if(this.user == null) // Redireccionar al usuario a iniciar sesion
      this.router.navigate(['/../../cuenta']);
    else if(this.user.rol != 'c')
      this.router.navigate(['/../../cuenta']);
    else 
    {
      if(this.prodCarro == null) 
        this.prodCarro = new Array();


      this.btnAgregarActivado = true;
      this.prodCarro.push(this.producto);
      localStorage.setItem('prodCarro', JSON.stringify(this.prodCarro));


      // Aumentar numero en el carro de compra 
      if($('#carro-icon-cont').text() == '')
        $('#carro-icon-cont').show();

      $('#carro-icon-cont').text(this.cantProdCarro());

      // Desaparecer btn agregar y mostrar btn editar y eliminar
      this.bandProdAgregado = true;
    }
  }


  eliminar()
  {
    // Eliminar producto
    let ind = this.veriProdAgregado();
    this.prodCarro.splice(ind, 1); 

    
    // Setear prodCarro a null en caso de estar vacio para evitar erroes al convertir el objeto a JSON
    if(this.prodCarro == '')
      this.prodCarro = null;
    


    this.btnAgregarActivado = false;
    localStorage.setItem('prodCarro', JSON.stringify(this.prodCarro)); // Modificar prodCarro del localStorage
    this.bandProdAgregado = false; // Aparecer boton agregar


    // Setear cantidad al carro de compra
    if(this.prodCarro == null) 
    {
      $('#carro-icon-cont').hide();
      $('#carro-icon-cont').text('');
    }else 
      $('#carro-icon-cont').text(this.cantProdCarro());
  }


  aumentar()
  {
    if(this.producto.can_comprar < this.producto.can_original) // Cantidad limite por aumentar del producto
    {
      
      if(!this.btnAgregarActivado) // Aumentar unicamente si no hay un vinculo entre this.producto y this.prodCarro
        ++this.producto.can_comprar;


      if(this.bandProdAgregado == true) 
      {
        let ind = this.veriProdAgregado(); // Tomar indice del prod agregado

        
        ++this.prodCarro[ind].can_comprar;

        $('#carro-icon-cont').text(this.cantProdCarro());
        localStorage.setItem('prodCarro', JSON.stringify(this.prodCarro));
      }

    }
  }


  disminuir()
  {
    if(this.producto.can_comprar > 1) // Cantidad limite por reducir del producto
    {

      if(!this.btnAgregarActivado) // Disminuir unicamente si no hay un vinculo entre this.producto y this.prodCarro
        --this.producto.can_comprar;


      if(this.bandProdAgregado == true) 
      {
        let ind = this.veriProdAgregado(); // Tomar indice del prod agregado


        --this.prodCarro[ind].can_comprar;

        $('#carro-icon-cont').text(this.cantProdCarro());
        localStorage.setItem('prodCarro', JSON.stringify(this.prodCarro));
      }
    }
  }


  // Verificar si el producto ya esta agregado 
  veriProdAgregado()
  {  
    let codigo = this.producto.codigo;
    let band = false;
    let ind = null;


    if(this.prodCarro != null && this.user != null)
    {
      this.prodCarro.forEach((e, i) => 
      {
        if(e.codigo == codigo)
        {
          ind = i;
          band = true;
        }
      });
    }
    
    this.bandProdAgregado = band;
    return ind;
  }



  // Permite expandir la img del visor
  expandirImgVisor()
  {
    let btn_close = `
      width: 35px;
      height: 35px;
      background: #000;
      border: 1px solid #fff;
      border-radius: 100%;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      padding-top: 2px;
      position: absolute;
      top: 30px;
      right: 30px;
      cursor: pointer;
    `;


    $('#visor-img').click(function(e) {
      var enlaceImagen = e.target.src;
      var data = $(this).attr("data");
      var lightbox = '<div class="ligthbox" style="width: 100%;height: 100%;position: fixed;top: 0px;margin-left: 0px;background: rgba(0, 0, 0, .9);display: flex;justify-content: center;align-items: center;z-index:1000">' +
          '<img src="' + enlaceImagen + '" alt="" id="zoom_mw" data-zoom-image="' + data + '" style="width:40%;height:auto">' +
          '<div class="btn-close" style="'+btn_close+'">X</div>' +
          '</div>';

      $("body").append(lightbox)
      $(".btn-close").click(function() {
          $(".ligthbox").remove();
      })
    })
  }


  // Recorrer array prodCarro para establecer la cantidad de productos agregados al carro de compra
  cantProdCarro()
  {
    let cantidad = 0;
    this.prodCarro.forEach(e => cantidad += e.can_comprar )

    return cantidad;
  }



}