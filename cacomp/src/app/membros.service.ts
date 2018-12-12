import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Membros } from './membros/membros';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MembrosService {

  constructor(private http: HttpClient) { }

  getMembros(): Observable<Membros[]> {
    return this.http.get<Membros[]>('http://localhost:3000/membros');
  }

  atualizarMembros(membros: Membros): Observable<any> {
    return this.http.put('http://localhost:3000/membros', membros, httpOptions);
  }

  apagarMembros(membros: Membros): Observable<any> {
    return this.http.delete('http://localhost:3000/membros/nome?eq=' + membros.nome);
  }

  adicionar(membros: Membros): Observable<any> {
    return this.http.post('http://localhost:3000/membros', membros, httpOptions);
  }
}
