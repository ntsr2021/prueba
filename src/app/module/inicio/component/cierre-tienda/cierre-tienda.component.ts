import { Component, OnInit } from '@angular/core';
import { HorarioCierreService } from './../../../../shared/service/horario-cierre.service';
import { HoraService } from './../../../../shared/service/hora.service';


@Component({
  selector: 'app-cierre-tienda',
  templateUrl: './cierre-tienda.component.html',
  styleUrls: ['./cierre-tienda.component.css']
})
export class CierreTiendaComponent implements OnInit {


	mostrarAlerta = false;
	horario = null;

  horaAperMens = null;
  horaCierMens = null;


  constructor(private horarioCierreService: HorarioCierreService,
              private horaService: HoraService) { }


  ngOnInit(): void {
  	this.consHorarioCierre();
  }


  consHorarioCierre()
  {
  	this.horarioCierreService.consultar().subscribe(resp => 
  	{
  		this.horario = resp;

      if(this.horario.hora_apertura != null)
      {
    		let horaIni = this.horario.hora_apertura.split(':');
        let horaFin = this.horario.hora_cierre.split(':');

    		let horaApertura = (parseInt(horaIni[0])*60*60)+(parseInt(horaIni[1])*60)+parseInt(horaIni[2]);
    		let horaCierre = (parseInt(horaFin[0])*60*60)+(parseInt(horaFin[1])*60)+parseInt(horaFin[2]);

        let hora : any;


        // Definir hora de apertura y cierre a mostrar en la alerta 
        let horaMedia = 12*60*60;
        if(horaApertura < horaMedia)
        {
          hora = parseInt(horaIni[0]);
          if(hora < 10)
            hora = '0'+hora;
          this.horaAperMens = hora+':'+horaIni[1]+'am';
        }
        else
        {
          hora = parseInt(horaIni[0])-12;
          if(hora < 10)
            hora = '0'+hora;
          this.horaAperMens = hora+':'+horaIni[1]+'pm';
        }

        if(horaCierre < horaMedia)
        {
          hora = parseInt(horaFin[0]);
          if(hora < 10)
            hora = '0'+hora;
          this.horaCierMens = hora+':'+horaFin[1]+'am';
        }
        else
        {
          hora = parseInt(horaFin[0])-12;
          if(hora < 10)
            hora = '0'+hora;
          this.horaCierMens = hora+':'+horaFin[1]+'pm';
        }
        ///////////////////////////////////


    		this.horaService.consultar().subscribe(resp => 
        {
          let horaActual = resp['hora'].split(':');
          horaActual = (parseInt(horaActual[0])*60*60)+(parseInt(horaActual[1])*60)+parseInt(horaActual[2]);


          if(horaActual < horaApertura || horaActual >= horaCierre)
            this.mostrarAlerta = true;

          setInterval(()=> {
            ++horaActual;

            if(horaActual < horaApertura || horaActual >= horaCierre)
              this.mostrarAlerta = true;
            else 
              this.mostrarAlerta = false;
          }, 1000);

        })
      }
  	})
  }
}