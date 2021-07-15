import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../../shared/service/user.service';
import { HorarioCierreService } from '../../../../shared/service/horario-cierre.service';

import * as alertify from 'alertifyjs';
declare var $:any;


@Component({
  selector: 'app-cierre-tienda',
  templateUrl: './cierre-tienda.component.html',
  styleUrls: ['./cierre-tienda.component.css']
})
export class CierreTiendaComponent implements OnInit {

  espera = false;

	horario = {
    activar : null,
		hora_apertura: null,
		hora_cierre: null
	}


  constructor(private userService: UserService,
              private horarioCierreService: HorarioCierreService) { }

  ngOnInit(): void {
    this.consultar();
  }


  consultar()
  {
    this.horarioCierreService.consultar().subscribe(resp =>
    {
      this.horario.hora_apertura = resp['hora_apertura'];
      this.horario.hora_cierre = resp['hora_cierre'];
      
      if(resp['estatus'] == 'i')
        this.horario.activar = false;
      else
        this.horario.activar = true;
    })
  }

  guardar()
  {
    if(this.horario.activar == true)
    {
      $('#cierre-tienda-form').validate({
        rules : {
          hora_apertura: { required:true },
          hora_cierre: { required:true }
        },
        messages: {
          hora_apertura: { required: 'Campo requerido' },
          hora_cierre: { required: 'Campo requerido' }
        },


        submitHandler: ()=> 
        {
          // Pasar hora de apertura y de cierre a segundos 
          let horAper = this.horario.hora_apertura.split(':');
          let segAper = (parseInt(horAper[0])*60*60)+(parseInt(horAper[1])*60);

          let horCier = this.horario.hora_cierre.split(':');
          let segCier = (parseInt(horCier[0])*60*60)+(parseInt(horCier[1])*60);


          
          // Comprobar que la hora de apertura sea menor a la hora de cierre
          if(segAper < segCier)
          {
            // Guardar configuracion
            this.horarioCierreService.guardar(this.horario).subscribe(resp=>
            {
              if(resp['mens'] == 'OK')
              {
                alertify.alert('Alerta', 'Configuración guardada exitosamente');
              }
            })

          }else
            alertify.alert('Alerta', 'La hora de apertura debe ser menor a la hora de cierre');

          this.espera = true;  
        }
      })
    }else 
    { // Guardar configuracion como nula
      this.horarioCierreService.guardar(this.horario).subscribe(resp=>
      {
        if(resp['mens'] == 'OK')
        {
          alertify.alert('Alerta', 'Configuración guardada exitosamente');
        }
      })
    }
  	
  }


  activarHorario()
  {
    if(this.horario.activar == false)
      this.reset();
  }

  reset()
  {
    this.horario.hora_apertura = null;
    this.horario.hora_cierre = null;
  }  
  
}
