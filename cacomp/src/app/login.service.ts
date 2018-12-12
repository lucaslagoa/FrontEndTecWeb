import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './login/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(nome: string, password: string): Observable<User> {
    return this.http.post<User>('http://localhost:3000/login', {
      nome: nome,
      password: password
    }, httpOptions);
  }
}
