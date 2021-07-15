import { Component, OnInit } from '@angular/core';

import { ProductoService } from './../../../../../../shared/service/producto.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  contDep = 0;
	departamentos = new Array();
  limit1 = 0;
  animEspera = false;
  activarConsMas = false;



  constructor(private productoService: ProductoService,
              private router: Router) { }


  ngOnInit(): void {
    this.consPorDepartamento();
  }


  consPorDepartamento() 
  {
    this.activarConsMas = false;
    this.animEspera = true; // Activar anim de espera


    this.productoService.consPorDepartamento(this.limit1).subscribe(resp => 
    {  
      let depAux: any = resp; 
      depAux.forEach(e => 
      {
        this.departamentos[this.contDep] = e;

        if(this.departamentos[this.contDep].productos == undefined)
          this.departamentos[this.contDep].productos = -1;

        ++this.contDep;
      });


      this.limit1 += this.departamentos.length;

      
      // Verifica si existen mas departamentos
      this.veriExisMasDepartamentos();


      // Desactivar anim de espera
      this.animEspera = false;
    })
  }


  veriExisMasDepartamentos()
  {
    this.productoService.consPorDepartamento(this.limit1).subscribe(resp => 
    {
      if(resp != null)
        this.activarConsMas = true;
      else
        this.activarConsMas = false;
    })
  }


  verTodos(id_departamento)
  {
    this.router.navigate(['categoria/' + id_departamento + ',,']);
    window.scroll(0,0);
  }

}
