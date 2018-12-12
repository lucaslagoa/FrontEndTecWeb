import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Reclamacoes } from './reclamacoes/reclamacoes';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReclamacoesService {

  constructor(private http: HttpClient) { }

  getReclamacoes(): Observable<Reclamacoes[]> {
    return this.http.get<Reclamacoes[]>('http://localhost:3000/reclamacoes');
  }

  atualizarReclamacoes(reclamacoes: Reclamacoes): Observable<any> {
    return this.http.put('http://localhost:3000/reclamacoes', reclamacoes, httpOptions);
  }

  apagarReclamacoes(reclamacoes: Reclamacoes): Observable<any> {
    return this.http.delete('http://localhost:3000/reclamacoes/nome?eq=' + reclamacoes.nome);
  }

  adicionar(reclamacoes: Reclamacoes): Observable<any> {
    return this.http.post('http://localhost:3000/reclamacoes', reclamacoes, httpOptions);
  }
}
