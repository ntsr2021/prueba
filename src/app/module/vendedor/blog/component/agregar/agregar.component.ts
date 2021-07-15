import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../../../../shared/service/blog.service';
import { Router } from '@angular/router';

declare var $:any;
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  articulo = {
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

  displayImgPrincipal : string = 'none';
  displayIconPrincipal: string = 'inline';


  constructor(private blogService: BlogService,
              private router: Router) { }


  ngOnInit(): void { }


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
    $('#control-selec-img').click();
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
        setTimeout(()=> // Se activa un contador para esperar que la img sea subida al servidor correctamente
        {

          let nombre_img = resp['nombre_img'];

          
          $('#lienzo').append(`
            <img class="img-tam-mediano" style="width:350px;height:auto;cursor:pointer" src="assets/img/blog/${nombre_img}" />
          `);


          let imgs = $('#lienzo').find('img');
          let imgActual = $(imgs[imgs.length-1]);


          // Activar seleccion en la imagen
          imgActual.click(function()
          {
            if($(this).hasClass('img-selec'))
            {
              $(this).removeClass('img-selec');
              $(this).css('border', '0px');
            }else 
            {
              $(this).addClass('img-selec');
              $(this).css('border', '3px solid blue');
            }
          });

        }, 300);

      }
    })
  }

  setTamanioImgGrande()
  {
    $('.img-selec').width(500);
    

    // Asignar clase segun el tamaño de la img
    $('.img-selec').removeClass('img-tam-pequenio');
    $('.img-selec').removeClass('img-tam-mediano');
    $('.img-selec').addClass('img-tam-grande');


    $('.img-selec').css('border', '0px');
    $('.img-selec').removeClass('img-selec');
  }

  setTamanioImgMediano()
  {
    $('.img-selec').width(350);


    // Asignar clase segun el tamaño de la img
    $('.img-selec').removeClass('img-tam-pequenio');
    $('.img-selec').removeClass('img-tam-grande');
    $('.img-selec').addClass('img-tam-mediano');


    $('.img-selec').css('border', '0px');
    $('.img-selec').removeClass('img-selec');
  }

  setTamanioImgPequenio()
  {
    $('.img-selec').width(200);


    // Asignar clase segun el tamaño de la img
    $('.img-selec').removeClass('img-tam-grande');
    $('.img-selec').removeClass('img-tam-mediano');
    $('.img-selec').addClass('img-tam-pequenio');


    $('.img-selec').css('border', '0px');
    $('.img-selec').removeClass('img-selec');
  }



  insertarVideo() 
  {
    let url = prompt('Introduce la URL');


    if(url != null && url != '')
    {
      let codVideo = url.split('=')[1];
      
      $('#lienzo').append(`
      <iframe class="video video-tam-mediano" width="600" height="337" src="https://www.youtube.com/embed/${codVideo}" style="padding:10px;cursor:pointer"
          title="YouTube video player" 
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
      `); 


      let videos = $('.video');
      let videoActual = $(videos[videos.length-1]);

      videoActual.click(function()
      {
        if($(this).hasClass('video-selec'))
        {
          $(this).removeClass('video-selec');
          $(this).css('border', '0px');
        }else 
        {
          $(this).addClass('video-selec');
          $(this).css('border', '3px solid blue');
        }
      })

      videoActual.hover(function()
      {
        if(!$(this).hasClass('video-selec'))
          $(this).css('border', '1px solid black'); 
      }, function()
      {
        if(!$(this).hasClass('video-selec'))
          $(this).css('border', '0px'); 
      });
    }
  }


  setTamanioVideoGrande()
  {
    $('.video-selec').attr('width', 900).attr('height', 500);


    // Asignar clase segun el tamaño del video
    $('.video-selec').removeClass('video-tam-pequenio');
    $('.video-selec').removeClass('video-tam-mediano');
    $('.video-selec').addClass('video-tam-grande');


    $('.video-selec').css('border', '0px');
    $('.video-selec').removeClass('video-selec');
  }

  setTamanioVideoMediano()
  {
    $('.video-selec').attr('width', 600).attr('height', 337);


    // Asignar clase segun el tamaño del video
    $('.video-selec').removeClass('video-tam-grande');
    $('.video-selec').removeClass('video-tam-pequenio');
    $('.video-selec').addClass('video-tam-mediano');


    $('.video-selec').css('border', '0px');
    $('.video-selec').removeClass('video-selec');
  }

  setTamanioVideoPequenio()
  {
    $('.video-selec').attr('width', 350).attr('height', 197);


    // Asignar clase segun el tamaño del video
    $('.video-selec').removeClass('video-tam-grande');
    $('.video-selec').removeClass('video-tam-mediano');
    $('.video-selec').addClass('video-tam-pequenio');


    $('.video-selec').css('border', '0px');
    $('.video-selec').removeClass('video-selec');
  }



  guardar() 
  {
    if($('#lienzo').html() == '')
      alertify.alert('Alerta', 'El contenido del artículo no debe estar vacío');

    else if(this.displayImgPrincipal == 'none')
      alertify.alert('Alerta', 'El artículo debe tener una imagen principal');

    else 
    {
      $('#guardar-form').validate({
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
          $('.video').removeClass('video-selec')
                     .css('border', '0px');
          $('#lienzo img').removeClass('img-selec')
                     .css('border', '0px');


          this.articulo.contenido = $('#lienzo').html();


          this.blogService.registrar(this.articulo).subscribe(resp => 
          {
            let mens = resp['mens'];


            if(mens == 'OK')
            {
              $('#guardar-modal').modal('hide');
              alertify.success('Artículo publicado');
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

  buscarImgPrincipal(){ $('[name="img_principal"]').click() }

  selecImgPrincipal(event)
  {
    $('#img_principal').attr('src', URL.createObjectURL(event.target.files[0]));

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
