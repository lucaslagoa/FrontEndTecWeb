import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Projetos } from './projetos/projetos';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProjetosService {

  constructor(private http: HttpClient) { }

  getProjetos(): Observable<Projetos[]> {
    return this.http.get<Projetos[]>('http://localhost:3000/projetos');
  }

  atualizarProjetos(projetos: Projetos): Observable<any> {
    return this.http.put('http://localhost:3000/projetos', projetos, httpOptions);
  }

  apagarProjetos(projetos: Projetos): Observable<any> {
    return this.http.delete('http://localhost:3000/projetos/nome?eq=' + projetos.nomeProjeto);
  }

  adicionar(projetos: Projetos): Observable<any> {
    return this.http.post('http://localhost:3000/projetos', projetos, httpOptions);
  }
}
