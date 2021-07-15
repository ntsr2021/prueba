import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { BlogService } from '../../../../../shared/service/blog.service';
import { Router } from '@angular/router';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  articulo = {
    id_articulo_blog: null,
    titulo: null,
    etiquetas: null,
    descripcion: null,
    contenido: '',
    nombre_img: null,
    base64_img: null
  };

  imgArticulo = {
    nombre: null,
    base64: null
  }

	displayImgPrincipal : string = 'inline';
  displayIconPrincipal: string = 'none';


  constructor(private blogService: BlogService,
  						private router: Router,
  						private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
  	this.consArticulo();
  }


  activarSelecImgVideo()
  {
    $('#lienzo-editar img').each(function()
    {
      $(this).click(function()
      {
        if($(this).hasClass('editar-img-selec'))
        {
          $(this).removeClass('editar-img-selec');
          $(this).css('border', '0px');
        }else 
        {
          $(this).addClass('editar-img-selec');
          $(this).css('border', '3px solid blue');
        }
      })
    });


    $('#lienzo-editar .video').each(function()
    {
      $(this).click(function()
      {
        if($(this).hasClass('editar-video-selec'))
        {
          $(this).removeClass('editar-video-selec');
          $(this).css('border', '0px');
        }else 
        {
          $(this).addClass('editar-video-selec');
          $(this).css('border', '3px solid blue');
        }
      })


      $(this).hover(function()
      {
        if(!$(this).hasClass('editar-video-selec'))
          $(this).css('border', '1px solid black'); 
      }, function()
      {
        if(!$(this).hasClass('editar-video-selec'))
          $(this).css('border', '0px'); 
      })
    });
  }


  // Consultar los datos del articulo seleccionado
  consArticulo()
  {
  	this.activatedRoute.paramMap.subscribe((params: ParamMap) => 
  	{
  	  this.articulo.id_articulo_blog = parseInt(params.get('id_articulo_blog'));

  	  this.blogService.consUno(this.articulo.id_articulo_blog).subscribe(resp => 
  	  {

  	  	this.articulo.titulo = resp['titulo'];
        this.articulo.etiquetas = resp['etiquetas'];
        this.articulo.descripcion = resp['descripcion'];
  	  	this.articulo.contenido = resp['contenido'];
  	  	this.articulo.nombre_img = resp['img'];


        $('#editar_img_principal').attr('src', 'assets/img/blog/'+this.articulo.nombre_img);


        $('#lienzo-editar').html(this.articulo.contenido);


        this.activarSelecImgVideo();

  	  });
  	});
  }


  activarFontTitulo()  {
    document.execCommand('FontSize', false, '7');
  }

  activarFontSubtitulo()  {
    document.execCommand('FontSize', false, '6');
  }

  activarFontParrafo() {
    document.execCommand('FontSize', false, '3');
  }


  activarNegrita() {
    document.execCommand("bold");
  }

  activarItalica() {
    document.execCommand("italic");
  }

  activarSubrayado() {
    document.execCommand("underline");
  }


  alinearIzquierda() {
    document.execCommand("JustifyLeft");
  }

  alinearDerecha() {
    document.execCommand("JustifyRight");
  }

  alinearCentro() {
    document.execCommand("JustifyCenter");
  }

  alinearJustificado() {
    document.execCommand("JustifyFull");
  }


  insertarListaOrdenada() {
    document.execCommand("InsertOrderedList");
  }

  insertarListaDesordenada() {
    document.execCommand("InsertUnorderedList")
  }


  insertarEnlace()
  {
    let url = prompt('Introduce la URL');

    if(url != null && url != '')
      document.execCommand("CreateLink", false, url);
  }



  insertarImg() {
    $('#editar-control-selec-img').click();
  }

  selecImg(event)
  {
    var files = event.target.files;
    var file = files[0];
    this.imgArticulo.nombre = file.name;

    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }

  _handleReaderLoaded(readerEvent) 
  {
    var binaryString = readerEvent.target.result;
    this.imgArticulo.base64 = btoa(binaryString); // Pasa cadena a 64 bits

    this.subirImgArticulo();
  }

  subirImgArticulo()
  {
    this.blogService.subirImg(this.imgArticulo).subscribe(resp =>
    {
      if(resp['mens'] == 'OK')
      {  
        setTimeout(()=> 
        {
          let nombre_img = resp['nombre_img'];
          
          $('#lienzo-editar').append(`
            <img class="img-tam-mediano" style="width:350px;height:auto;cursor:pointer" src="assets/img/blog/${nombre_img}" />
          `);


          let imgs = $('#lienzo-editar').find('img');
          let imgActual = $(imgs[imgs.length-1]);


          // Activar seleccion en la imagen
          imgActual.click(function()
          {
            if($(this).hasClass('editar-img-selec'))
            {
              $(this).removeClass('editar-img-selec');
              $(this).css('border', '0px');
            }else 
            {
              $(this).addClass('editar-img-selec');
              $(this).css('border', '3px solid blue');
            }
          });

        }, 300);
      }
    })
  }


  setTamanioImgGrande()
  {
    $('.editar-img-selec').width(500);
    

    // Asignar clase segun el tamaño de la img
    $('.editar-img-selec').removeClass('img-tam-pequenio');
    $('.editar-img-selec').removeClass('img-tam-mediano');
    $('.editar-img-selec').addClass('img-tam-grande');


    $('.editar-img-selec').css('border', '0px');
    $('.editar-img-selec').removeClass('editar-img-selec');
  }

  setTamanioImgMediano()
  {
    $('.editar-img-selec').width(350);


    // Asignar clase segun el tamaño de la img
    $('.editar-img-selec').removeClass('img-tam-pequenio');
    $('.editar-img-selec').removeClass('img-tam-grande');
    $('.editar-img-selec').addClass('img-tam-mediano');


    $('.editar-img-selec').css('border', '0px');
    $('.editar-img-selec').removeClass('editar-img-selec');
  }

  setTamanioImgPequenio()
  {
    $('.editar-img-selec').width(200);


    // Asignar clase segun el tamaño de la img
    $('.editar-img-selec').removeClass('img-tam-grande');
    $('.editar-img-selec').removeClass('img-tam-mediano');
    $('.editar-img-selec').addClass('img-tam-pequenio');


    $('.editar-img-selec').css('border', '0px');
    $('.editar-img-selec').removeClass('editar-img-selec');
  }



  insertarVideo() 
  {
    let url = prompt('Introduce la URL');
    
    let codVideo = url.split('=')[1];
    
    if(url != null)
    {
      $('#lienzo-editar').append(`
      <iframe class="video video-tam-mediano" width="600" height="337" src="https://www.youtube.com/embed/${codVideo}" style="padding:10px;cursor:pointer"
          title="YouTube video player" 
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
      `); 


      let videos = $('#lienzo-editar .video');
      let videoActual = $(videos[videos.length-1]);

      videoActual.click(function()
      {
        if($(this).hasClass('editar-video-selec'))
        {
          $(this).removeClass('editar-video-selec');
          $(this).css('border', '0px');
        }else 
        {
          $(this).addClass('editar-video-selec');
          $(this).css('border', '3px solid blue');
        }
      })

      videoActual.hover(function()
      {
        if(!$(this).hasClass('editar-video-selec'))
          $(this).css('border', '1px solid black'); 
      }, function()
      {
        if(!$(this).hasClass('editar-video-selec'))
          $(this).css('border', '0px'); 
      });
    }
  }

  setTamanioVideoGrande()
  {
    $('.editar-video-selec').attr('width', 900).attr('height', 500);


    // Asignar clase segun el tamaño del video
    $('.editar-video-selec').removeClass('video-tam-pequenio');
    $('.editar-video-selec').removeClass('video-tam-mediano');
    $('.editar-video-selec').addClass('video-tam-grande');


    $('.editar-video-selec').css('border', '0px');
    $('.editar-video-selec').removeClass('editar-video-selec');
  }

  setTamanioVideoMediano()
  {
    $('.editar-video-selec').attr('width', 600).attr('height', 337);


    // Asignar clase segun el tamaño del video
    $('.editar-video-selec').removeClass('video-tam-grande');
    $('.editar-video-selec').removeClass('video-tam-pequenio');
    $('.editar-video-selec').addClass('video-tam-mediano');


    $('.editar-video-selec').css('border', '0px');
    $('.editar-video-selec').removeClass('editar-video-selec');
  }

  setTamanioVideoPequenio()
  {
    $('.editar-video-selec').attr('width', 350).attr('height', 197);


    // Asignar clase segun el tamaño del video
    $('.editar-video-selec').removeClass('video-tam-grande');
    $('.editar-video-selec').removeClass('video-tam-mediano');
    $('.editar-video-selec').addClass('video-tam-pequenio');


    $('.editar-video-selec').css('border', '0px');
    $('.editar-video-selec').removeClass('editar-video-selec');
  }



  editar() 
  {
    if($('#lienzo-editar').html() == '')
      alertify.alert('Alerta', 'El contenido del artículo no debe estar vacío');

    else if(this.displayImgPrincipal == 'none')
      alertify.alert('Alerta', 'El artículo debe tener una imagen principal');

    else 
    {
      $('#editar-form').validate({
        rules : {
          titulo: { required:true, alfanumerico:true, maxlength:100 },
          etiquetas: { required:true, descripcion:true, maxlength:200 },
          descripcion: { required:true, descripcion:true, maxlength:300 }
        },
        messages: {
          titulo: { required:'Campo requerido', maxlength:'Máximo 100 caracteres' },
          etiquetas: { required:'Campo requerido', maxlength:'Máximo 200 caracteres' },
          descripcion: { required:'Campo requerido', maxlength:'Máximo 300 caracteres' }
        },


        submitHandler: ()=> 
        {

          // Eliminar formato a imgs y videos
          $('#editar .video').removeClass('editar-video-selec')
                     .css('border', '0px').css('cursor', 'auto');
          $('#lienzo-editar img').removeClass('editar-img-selec')
                     .css('border', '0px').css('cursor', 'auto');


          this.articulo.contenido = $('#lienzo-editar').html();

          this.blogService.editar(this.articulo).subscribe(resp => 
          {
            let mens = resp['mens'];
            

            if(mens == 'OK')
            {
              $('#editar-modal').modal('hide');
              alertify.success('Artículo editado');
              setTimeout(()=> this.router.navigate(['vendedor/blog']), 300);
            }
            else 
              alertify.alert('Alerta', 'Ha ocurrido un error, intenta de nuevo');
          })
        }
      })
    }
  }


  // Gestionar img principal 
  eliminarImgPrincipal()
  {
    this.displayImgPrincipal = 'none';
    this.displayIconPrincipal = 'inline';
  }

  buscarImgPrincipal(){ $('[name="editar_img_principal"]').click() }

  selecImgPrincipal(event)
  {
    $('#editar_img_principal').attr('src', URL.createObjectURL(event.target.files[0]));

    this.displayIconPrincipal = 'none';
    this.displayImgPrincipal = 'inline';


    var files = event.target.files;
    var file = files[0];
    this.articulo.nombre_img = file.name;

    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsBinaryString(file);
  }
  _handleReaderLoaded2(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.articulo.base64_img = btoa(binaryString); // Pasa cadena a 64 bits
  }


}
