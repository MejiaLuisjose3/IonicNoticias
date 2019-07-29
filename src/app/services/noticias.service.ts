import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;
const apiKey = environment.apiKey;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
 HeadLinesPages: number;
 categoriaActual = '';
 categoriaPage = 0;

 constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }
  getTopHeadlines() {
    this.HeadLinesPages++;
   return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.HeadLinesPages}`);
  }
  getTopHeadlinescategoria(categoria: string ) {
    if ( this.categoriaActual === categoria ) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${ categoria }&page=${this.categoriaPage}`);
  }
}
