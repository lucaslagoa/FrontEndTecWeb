import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sugestoes } from './sugestoes/sugestoes';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class SugestoesService {

  constructor(private http: HttpClient) { }

  getSugestoes(): Observable<Sugestoes[]> {
    return this.http.get<Sugestoes[]>('http://localhost:3000/sugestoes');
  }

  atualizarSugestoes(sugestoes: Sugestoes): Observable<any> {
    return this.http.put('http://localhost:3000/sugestoes', sugestoes, httpOptions);
  }

  apagarSugestoes(sugestoes: Sugestoes): Observable<any> {
    return this.http.delete('http://localhost:3000/sugestoes/nome?eq=' + sugestoes.nomeSugestao);
  }

  adicionar(sugestoes: Sugestoes): Observable<any> {
    return this.http.post('http://localhost:3000/sugestoes', sugestoes, httpOptions);
  }
}
