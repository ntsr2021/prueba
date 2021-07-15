import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { BlogService } from '../../../../../../shared/service/blog.service';
import { UserService } from '../../../../../../shared/service/user.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-comentar',
  templateUrl: './comentar.component.html',
  styleUrls: ['./comentar.component.css']
})
export class ComentarComponent implements OnInit {


	comentario = {
		id_coment_receptor: null,
		id_articulo_blog: null,
		comentario: null,
		id_user: null 
	}

	jwt = {
	  token: window.localStorage.getItem('token')
	}

	@Output() comEvent = new EventEmitter();
	@Input() id_articulo_blog = null;


  constructor(private blogService: BlogService,
  						private userService: UserService) { }


  ngOnInit(): void {
  	this.comentario.id_articulo_blog = this.id_articulo_blog;
  	this.consUser();
  }


  consUser()  {
    this.userService.consultar(this.jwt).subscribe(resp => {
   		this.comentario.id_user = resp['id_user']
   	});
  }


  comentar()
  {
  	$('#comentar-form').validate({
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
  	        $('#comentar-modal').modal('hide');
  	        this.comEvent.emit(true);
  	        this.comentario.comentario = '';
  	      }
  	    });
  	  }
  	})
  }

}
