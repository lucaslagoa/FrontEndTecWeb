import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('TIPO');
    this.router.navigate(['/login']);
  }

  userTipo(tipo: string) {
    if ( localStorage.getItem('TIPO') === tipo ) { return true; }
    return false;
  }

}
