import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProductoService } from '../../../../../shared/service/producto.service';
import { ProductoFotoService } from '../../../../../shared/service/producto-foto.service';
import { ArchivoService } from '../../../../../shared/service/archivo.service';

declare var $:any;
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {

  id_producto = null;
	codigo = null;
	fotos = null;
 
  archivo = { // Guardara el archivo del producto que se editara
    id_producto: null,
    nombre: null,
    base64: null
  }
  archivo2 = { // Guardara el archivo del producto que se agregara
    nombre: null,
    base64: null
  }

  marcaTiempo = 0;


  constructor(private activatedRoute: ActivatedRoute,
  						private productoService: ProductoService,
  						private productoFotoService: ProductoFotoService,
              private archivoService: ArchivoService) { }

  ngOnInit(): void 
  {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => 
  	{ 
      this.id_producto = params.get('id_producto');
     	this.consulCodigo(this.id_producto);
     	this.consulFoto(this.id_producto);
  	})
  }

  consulCodigo(id_producto)
  {
    this.productoService.consUno(id_producto).subscribe(res =>
    {
      this.archivo.id_producto = id_producto; // Tomamos el id del producto porque este sera el que se editara
      this.codigo = res['codigo'];
    })
  }
  consulFoto(id_producto)
  {
  	this.productoFotoService.consultar(id_producto).subscribe(res => 
    {
      ++this.marcaTiempo;
      this.fotos = res;
      setTimeout(()=> this.script(), 300);
  	});
  }

  
  clicFile()
  { 
    if(this.fotos != null)
    {
      if(this.fotos.length < 6)
        $('[name="foto"]').click();
      else 
        alertify.alert('Alerta', 'Solo se permiten 5 imágenes segundarias por producto');
    }else 
      $('[name="foto"]').click();
  }

  seleccionarArchivo(event)
  {
    var files = event.target.files;
    var file = files[0];
     

    this.archivo.nombre = this.codigo; // Nombre foto 


    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64 = btoa(binaryString); // Pasa cadena a 64 bits

    this.subirArchivo();
  }
  subirArchivo()
  {
    this.archivoService.subir(this.archivo).subscribe(resp =>
    {
      if(resp['mens'] == 'OK')
      {
        alertify.success('Foto guardada exitosamente');
        // setTimeout(()=> location.reload(), 300);
        this.consulFoto(this.id_producto);
      }else 
        alertify.error('Ejecución fallida');
    })
  }


  eliminarFoto(foto)
  {
    alertify.confirm('Confirmar', '¿Estás seguro que deseas eliminar?',
    ()=> {
      this.productoFotoService.eliminar(foto.id_producto_foto, foto.id_producto, foto.foto).subscribe(resp => 
      {
        if(resp['mens'] == 'OK') 
        {
          alertify.success('Foto eliminada');
          // setTimeout(()=> location.reload(), 300);
          this.consulFoto(this.id_producto);
        }else 
          alertify.error('Ejecución fallida');
      });
    }, ()=>{});
  }


  // Editar foto
  clicFile2(foto)
  { 
    this.archivo2.nombre = foto.foto;
    $('[name="foto2"]').click(); 
  }
  seleccionarArchivo2(event)
  {
    var files = event.target.files;
    var file = files[0];

    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded_2.bind(this);
    reader.readAsBinaryString(file);
  }
  _handleReaderLoaded_2(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.archivo2.base64 = btoa(binaryString); // Pasa cadena a 64 bits

    this.editarArchivo();
  }
  editarArchivo()
  {
    this.archivoService.editar(this.archivo2).subscribe(resp =>
    {
      if(resp['mens'] == 'OK')
      {
        alertify.success('Foto cambiada exitosamente');
        // setTimeout(()=> location.reload(), 300);
        this.consulFoto(this.id_producto);
      }else 
        alertify.success('Ejecución fallida');
    })
  }


  script()
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

    $(".imagen").click(function(e) {
        var enlaceImagen = e.target.src;
        var data = $(this).attr("data");
        var lightbox = '<div class="ligthbox" style="width: 45%;height: 70%;position: fixed;top: 110px;margin-left: 90px;background: rgba(0, 0, 0, .8);display: flex;justify-content: center;align-items: center;z-index:9000 !important">' +
            '<img src="' + enlaceImagen + '" alt="" id="zoom_mw" data-zoom-image="' + data + '" style="width:400px;height:400px">' +
            '<div class="btn-close" style="'+btn_close+'">X</div>' +
            '</div>';

        $("body").append(lightbox)
        $(".btn-close").click(function() {
            $(".ligthbox").remove();
        })
    })
  }
  /////////////////////

}