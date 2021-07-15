import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { BlogService } from '../../../../../../shared/service/blog.service';
import { UserService } from '../../../../../../shared/service/user.service';
import { FormatoFecha } from '../../../../../../shared/helper/formato-fecha';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {


	comentario = {
	  id_user: null, 
	  comentario: null,
	  id_articulo_blog: null,
    id_coment_receptor: null
	}

  cantComent = null;

	jwt = {
	  token: window.localStorage.getItem('tokenCliente')
	}
	user = null;
	sugerirRegistro = false;

	@Input() id_articulo_blog = null;

	comentarios = null;



  constructor(private blogService: BlogService,
  						private userService: UserService,
              private router: Router,
              private formatoFecha: FormatoFecha) { }


  ngOnInit(): void {
    // Pasar al objeto comentario el id del articulo
    this.comentario.id_articulo_blog = this.id_articulo_blog;

  	this.consUser();
  	this.consComentarios();
  }


  consUser() 
  {
    this.userService.consultar(this.jwt).subscribe(resp =>
    {
      this.user = resp;
      if(this.user == null) // Si el usuario no esta logueado sugerir registro
        this.sugerirRegistro = true;
      else // Pasar el id del usuario logueado al objeto comentario
        this.comentario.id_user = this.user.id_user;
    });
  }


  consTotalComent() {
    this.blogService.consTotalComent(this.id_articulo_blog).subscribe(resp => this.cantComent = resp['total'])
  }


  comentar()
  {
    if(this.user != null)
    {
      $('#comentario-form').validate({
        rules : {
          comentario: { required:true, descripcion:true, maxlength:500 }
        },
        messages: {
          comentario: { required:'Campo requerido', maxlength:'Máximo 500 caracteres' }
        },


        submitHandler: ()=> 
        {
          this.blogService.comentar(this.comentario).subscribe(resp => 
          {
            if(resp['mens'] == 'OK')
            {
              this.comentario.comentario = '';
              alertify.success('Comentario publicado exitosamente');
              this.consComentarios();
            }
          });
        }
      })
    }

    else // Enviar al registro
      this.router.navigate(['cuenta']);
  }


  consComentarios()
  {
  	this.blogService.consComentarios(this.id_articulo_blog).subscribe(resp => this.comentarios = resp );
    this.consTotalComent(); // Obtener total de comentarios
  }


  establecerFormatoFecha(fechaHoraIngresada)
  {
    let fechaHora = fechaHoraIngresada.split(' ');
    
    return this.formatoFecha.fechaNombre(fechaHora[0]) + ' a las ' + this.formatoFecha.hora(fechaHora[1]);
  }


  responder(event, id_coment_receptor)
  {
    if(this.user != null)
    {
      let e = $(event.target);
      let padE = e.parent().parent().parent();
      let nomReceptor = padE.find('.nombre').text();


      this.comentario.id_coment_receptor = id_coment_receptor;


      $('.comentario-respuesta-form').remove();
      $('#comentario-form').hide();


      // Añadir caja de comentario para responder luego del elemeto padre
      padE.after(`

        <form class="ml-4 comentario-respuesta-form">
          
          <div class="mt-2 mb-4">

            <!-- Responder a ... y cancelar respuesta -->
            <span>Responder a <b>${nomReceptor}</b></span>
            <button type="button" class="btn btn-secondary btn-sm cancelar-respuesta" style="float: right">Cancelar respuesta</button>
            
            <!-- Campo para comentar -->
            <br>
            <div class="mt-2">
              <span>Comentario</span>
              <textarea class="form-control" rows="5" name="comentario"></textarea>
              <label class="error error-label" id="comentario-error" for="comentario"></label><br>

              <!-- Btn para comentar -->
              <button type="submit" class="btn btn-primary btn-responder">Comentar</button>
            </div>
          </div>

        </form>

      `);

      
      // Cancelar respuesta del comentario
      $('.cancelar-respuesta').click(() => 
      {
        this.comentario.id_coment_receptor = null;
        $('.comentario-respuesta-form').remove(); // Eliminar caja de comentario de respuesta
        $('#comentario-form').show(); // Mostrar caja de comentario nuevo
      });



      // Procesaro form responder comentario
      $('.comentario-respuesta-form').find('.btn-responder').click(() =>
      {

        $('.comentario-respuesta-form').validate({
          rules : {
            comentario: { required:true, descripcion:true, maxlength:500 }
          },
          messages: {
            comentario: { required:'Campo requerido', maxlength:'Máximo 500 caracteres' }
          },


          submitHandler: ()=> 
          {
            this.comentario.comentario = $('.comentario-respuesta-form').find('[name="comentario"]').val();

            this.blogService.comentar(this.comentario).subscribe(resp => 
            {
              if(resp['mens'] == 'OK')
              {
                this.comentario.comentario = '';
                alertify.success('Comentario publicado exitosamente');
                $('#comentario-form').show(); // Mostra caja de comentario nuevo
                this.consComentarios();
                this.comentario.id_coment_receptor = null; // Setear como nulo en id del coment receptor para evitar errores si hay un coment nuevo
              }
            });
          }
        })

      });
    }  

    else // Enviar al registro
      this.router.navigate(['cuenta']);

  }

}
