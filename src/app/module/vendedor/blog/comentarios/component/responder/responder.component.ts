import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BlogService } from '../../../../../../shared/service/blog.service';
import { UserService } from '../../../../../../shared/service/user.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css']
})
export class ResponderComponent implements OnInit {

  comentario = {
		receptor: null,
		coment_receptor: null,
		id_coment_receptor: null,
		id_articulo_blog: null,
		comentario: null,
		id_user: null 
	}

	jwt = {
	  token: window.localStorage.getItem('token')
	}

	@Output() respEvent = new EventEmitter();


  constructor(private blogService: BlogService,
  						private userService: UserService) { }

  ngOnInit(): void {
  	this.consUser();
  }


  consUser()  {
    this.userService.consultar(this.jwt).subscribe(resp => {
   		this.comentario.id_user = resp['id_user']
   	});
  }


  comentar(id_articulo_blog_coment)
  {
  	this.blogService.consUnComentario(id_articulo_blog_coment).subscribe(resp => 
  	{
  		this.comentario.receptor = resp['autor'];
  		this.comentario.coment_receptor = resp['comentario'];
  		this.comentario.id_coment_receptor = id_articulo_blog_coment;
  		this.comentario.id_articulo_blog = resp['id_articulo_blog'];
  		this.comentario.comentario = null;


  		$('#responder-modal').modal('show');
  	});
  }


  responder()
  {
  	$('#responder-form').validate({
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
  	        alertify.success('Comentario publicado exitosamente');
  	        $('#responder-modal').modal('hide');
  	        this.respEvent.emit(true);
  	      }
  	    });
  	  }
  	})
  }

}
