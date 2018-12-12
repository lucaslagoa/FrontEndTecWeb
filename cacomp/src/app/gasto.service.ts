import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Gasto } from './gasto/gasto';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(private http: HttpClient) { }

  getGasto(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>('http://localhost:3000/gasto');
  }

  atualizarGasto(gasto: Gasto): Observable<any> {
    return this.http.put('http://localhost:3000/gasto', gasto, httpOptions);
  }

  apagarGasto(gasto: Gasto): Observable<any> {
    return this.http.delete('http://localhost:3000/gasto/nome?eq=' + gasto.nomeGasto);
  }

  adicionar(gasto: Gasto): Observable<any> {
    return this.http.post('http://localhost:3000/gasto', gasto, httpOptions);
  }
}
