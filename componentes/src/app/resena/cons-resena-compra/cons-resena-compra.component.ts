import {HttpClient} from '@angular/common/http';
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { resenaCompra,respResCompra } from 'src/app/interface/resenas.interface';
import { ConectionBdServiceService } from '../../services/conection-bd-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cons-resena-compra',
  templateUrl: './cons-resena-compra.component.html',
  styleUrls: ['./cons-resena-compra.component.css']
})
export class ConsResenaCompraComponent implements AfterViewInit  {
  estatus: any
  displayedColumns: string[] = ['id_resena_compra', 'puntaje','estatus','accion','descripcion'];
  data: resenaCompra[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private conectionBdService: ConectionBdServiceService) {}

  ngAfterViewInit() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.cargartabla();

  
  }

  activarComentario(row){
    this.estatus = {id_resena_compra: row.id_resena_compra, accion:1}
    this.conectionBdService.cambioEstatusCompra(this.estatus).subscribe();
    this.cargartabla();        
  }
  
  desactivarComentario(row){

    this.estatus = {id_resena_compra: row.id_resena_compra, accion:2}
    this.conectionBdService.cambioEstatusCompra(this.estatus).subscribe();
    this.cargartabla();

    
  }
  eliminarComentrio(row){

    Swal.fire({
      title: "¿Estás Seguro?",
      text: `¿Estas seguro que desea eliminar?`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    
    }).then( resp => {
      
      if (resp.value){
        this.estatus = {id_resena_compra: row.id_resena_compra, accion:3}
        this.conectionBdService.cambioEstatusCompra(this.estatus)
        .subscribe();
        this.cargartabla();

      }
    });   
  }

  cargartabla(){
    
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.conectionBdService.getResenaCompra(
            this.sort.active, this.sort.direction, this.paginator.pageIndex)
          .pipe(catchError(() => observableOf(null)));
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;

        if (data === null) {
          return [];
        }

        // Only refresh the result length if there is new data. In case of rate
        // limit errors, we do not want to reset the paginator to zero, as that
        // would prevent users from re-triggering requests.
        this.resultsLength = data.total_count;
        return data.items;
      })
    ).subscribe(data => this.data = data);

  }
}




