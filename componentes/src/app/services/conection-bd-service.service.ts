import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { GiftCardResponse, PresentacionGiftCard } from '../interface/giftCard-response';
import {MatSort, SortDirection} from '@angular/material/sort';
import { respResCompra, respResProducto } from '../interface/resenas.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2'
import { Estados } from '../interface/estados.interfaces';




@Injectable({
  providedIn: 'root'
})
export class ConectionBdServiceService {

  private url = "http://localhost:80/modulo_gift_card/server/gift-card";

  constructor(private http: HttpClient) { }

  insertarGiftcard(giftCard: FormGroup){
        
    return this.http.post(`${this.url}/registrar.php`, JSON.stringify(giftCard.value))
      .pipe(
        catchError( error => {
          console.log(error.ok);
          if(error.ok==false){
            Swal.fire('Error','Revise Comunicacion','error')
          }
          return of();
        })
      );
  }

  //llenado de las imagenes de las giftcardS
  consulta_presentacion_giftCard():Observable<PresentacionGiftCard>{
    
    return this.http.get<PresentacionGiftCard>(`${this.url}/consultar_presentacion_giftCard.php`);
    
  }


  recargaTarjeta(forma: FormGroup){

    return this.http.post(`${this.url}/recarga-tarjeta.php`, JSON.stringify(forma.value))
    .pipe(
      catchError( error => {
        console.log(error.ok);
        if(error.ok==false){
          Swal.fire('Error','Revise Comunicacion','error')
        }
        return of();
      })
    );
  }

  registraResenaCompra(forma: FormGroup){
    return this.http.post(`${this.url}/registrar-resena-compra.php`, JSON.stringify(forma.value))
    .pipe(
      catchError( error => {
        console.log(error.ok);
        if(error.ok==false){
          Swal.fire('Error','Revise Comunicacion','error')
        }
        return of();
      })
    );;
  }

  registraResenaProducto(forma: FormGroup){
    return this.http.post(`${this.url}/registrar-resena-producto.php`, JSON.stringify(forma.value))
    .pipe(
      catchError( error => {
        console.log(error.ok);
        if(error.ok==false){
          Swal.fire('Error','Revise Comunicacion','error')
        }
        return of();
      })
    );;
  }

  consResenaCompra(){
    return this.http.get(`${this.url}/consultar-resena-compra.php`);
  }

  getResenaProducto(sort: string, order: SortDirection, page: number): Observable<respResProducto> {

    const href = `${this.url}/consultar-resena-producto.php`; 
    const requestUrl = `${href}?sort=${sort}&order=${order}&page=${page + 1}`;
    return this.http.get<respResProducto>(requestUrl);
 
  }

  getResenaCompra(sort: string, order: SortDirection, page: number): Observable<respResCompra> {
    
    const href = `${this.url}/consultar-resena-compra.php`;
    const requestUrl =`${href}?sort=${sort}&order=${order}&page=${page + 1}`;
    return this.http.get<respResCompra>(requestUrl);
  
  }

  cambioEstatusCompra(estatus){

    return this.http.post(`${this.url}/estatus-resena-compra.php`,JSON.stringify(estatus));

  }

  cambioEstatusProducto(estatus){

    return this.http.post(`${this.url}/estatus-resena-producto.php`,JSON.stringify(estatus));

  }

  getEstados():Observable<Estados>{

    return this.http.get<Estados>(`${this.url}/cargar-estados.php`);

  }



  getCiudades(estado){
  
    return this.http.get(`${this.url}/cargar-ciudades.php?estado=${estado}`);

  }

  getMunicipios(estado){

    return this.http.get(`${this.url}/cargar-municipios.php?estado=${estado}`);

  }

  getParroquias(municipio){

    return this.http.get(`${this.url}/cargar-parroquias.php?municipio=${municipio}`);

  }

  enviarDireccion(direccion: FormGroup){

    return this.http.post(`${this.url}/registrar-direccion.php`,JSON.stringify(direccion.value));
    
  }

}
