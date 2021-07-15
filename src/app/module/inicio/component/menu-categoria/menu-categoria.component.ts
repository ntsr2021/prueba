import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { DepartamentoService } from '../../../../shared/service/departamento.service';
import { DepartamentoGrupoService } from '../../../../shared/service/departamento-grupo.service';

declare var $:any;


@Component({
  selector: 'app-menu-categoria',
  templateUrl: './menu-categoria.component.html',
  styleUrls: ['./menu-categoria.component.css']
})
export class MenuCategoriaComponent implements OnInit {

	depGrupos = null;
  departamentos = null;
  menu = null;
  bandMostrarMenu = false;
  @Output() menuCategoriaEvent = new EventEmitter();

  buscador = {
    id_departamento1 : null,
    id_departamento2 : null,
    id_departamento3 : null
  }


  constructor(private departamentoGrupoService: DepartamentoGrupoService,
              private departamentoService: DepartamentoService,
              private router: Router) { }


  ngOnInit(): void {
  	this.consDepGrupos();
  	this.consDepartamentos();
  }


  // Consultar grupos de departamentos 
  consDepGrupos() {
    this.departamentoGrupoService.consTodos().subscribe(resp => this.depGrupos = resp)
  }


  // Consultar departamentos
  consDepartamentos() {
    this.departamentoService.consMenu().subscribe(resp => {
      this.menu = resp;
      setTimeout(()=> this.organizarMenu(), 300)
    });
  }


  // Organizar menu
  organizarMenu()
  {
    $('#menu-categoria .menu-categoria-desplegable').each(function(i, e) // Organizar
    {
      let grupoIncluir = $($(e).find('a').attr('href'));
      $(e).append(grupoIncluir);
    });


    // Aumenta la anchura del elemento para que no se arrastre con el menu, al momento que este ultimo desaparezca
    $('#menu-categoria-col2').css('width', +$('#menu-categoria-col').width());
    // Ocultar contenedor del menu a la izquierda
    $('#menu-categoria-col').css('margin-left', -$('#menu-categoria-col').width()); 
    


    $('#menu-categoria .menu-categoria-desplegable i').click(function(e) // Añadir animacion
    { 
      let i = $(this);
      let ulChildren = i.parent().children('ul');


      if(!i.hasClass('active')) // Expandir menu
      {
        i.addClass('active');

        e.target.classList.remove("menu-categoria-ani-rotar-volver"); // Eliminar clase con js puro 

        i.addClass('menu-categoria-ani-rotar');
        ulChildren.slideDown();
      }

      else // Contraer menu
      {
        i.removeClass('active');

        e.target.classList.remove("menu-categoria-ani-rotar"); // Eliminar clase con js puro

        i.addClass('menu-categoria-ani-rotar-volver');
        ulChildren.slideUp();
      }

    });

  }


  // Buscar al seleccionar una categoria del menu
  buscarPorDep(event) 
  {
    event.stopPropagation();
    event.preventDefault();

    let e = $(event.target);
    let padre1 : any = null;
    let padre2 : any = null;


    // Definir elementos padre para poder asignar el valor correspondiente de cada departamento
    if(e.parent().parent().parent().parent().hasClass('menu-categoria-desplegable'))
    {
      padre1 = e.parent().parent().parent().parent();

      if(padre1.parent().parent().parent().hasClass('menu-categoria-desplegable'))
        padre2 = padre1.parent().parent().parent();
    }


    // Asignar el vaolor correspondiente a cada id_departamento segun la altura del elemento padre
    if(padre1 != null && padre2 != null)
    {
      this.buscador.id_departamento1 = padre2.find('a').attr('id').split('-')[1]; 
      this.buscador.id_departamento2 = padre1.find('a').attr('id').split('-')[1]; 
      this.buscador.id_departamento3 = e.attr('id').split('-')[1]; 
    }
    else if(padre1 != null)
    {
      this.buscador.id_departamento1 = padre1.find('a').attr('id').split('-')[1];
      this.buscador.id_departamento2 = e.attr('id').split('-')[1]; 
      this.buscador.id_departamento3 = null; 
    }
    else 
    {
      this.buscador.id_departamento1 = e.attr('id').split('-')[1]; 
      this.buscador.id_departamento2 = null; 
      this.buscador.id_departamento3 = null; 
    }
    

    // Cerrar menu de categorias
    this.cerrar();


    // Enviar id_departamentos por la URL
    this.router.navigate(['categoria/'+[this.buscador.id_departamento1, this.buscador.id_departamento2, this.buscador.id_departamento3]]);
  } 


  // Mostrar menu 
  mostrar() 
  {
    $('#menu-categoria-content').show().animate({'opacity':1}, 300);
    $('#menu-categoria-col').animate({'margin-left': 0}, 300);
  }


  // Cerrar menu 
  cerrar()
  {
    $('#menu-categoria-col').animate({'margin-left': -$('#menu-categoria-col').width()}, 300);
    $('#menu-categoria-content').animate({'opacity':0}, 300, ()=> $('#menu-categoria-content').hide());
  }


}
