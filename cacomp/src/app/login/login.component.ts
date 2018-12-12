import {Component, NgZone, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  nome: null;
  password: null;

  ngOnInit() {
  }

  constructor(private loginService: LoginService, private router: Router, private ngZone: NgZone) {
  }

  login() {
    this.loginService.login(this.nome, this.password).subscribe(
      user => {
        if (user.token) {
          localStorage.setItem('TOKEN', user.token);
          localStorage.setItem('TIPO', user.tipo);

          if ( user.tipo === 'membros' ) {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/main/membros');
            });
          } else {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/main/admin');
            });
          }
        }
      }, r => {
        alert(r.error.error);
      });
  }
}
