import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  MembrosComponent  } from 'src/app/membros/membros.component'
import {  GastoComponent  } from 'src/app/gasto/gasto.component'
import {  HomeComponent } from 'src/app/home/home.component'
import { ProjetosComponent } from './projetos/projetos.component';
import { ReclamacoesComponent } from './reclamacoes/reclamacoes.component';
import { SugestoesComponent } from './sugestoes/sugestoes.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './login/login-auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'main', component: MainComponent,
    canActivate: [AuthGuard],
    children: [
  { path: 'home' , component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'membros' , component: MembrosComponent , canActivate: [AuthGuard] },
  { path: 'gasto' , component: GastoComponent , canActivate: [AuthGuard] },
  { path: 'projetos' , component: ProjetosComponent, canActivate: [AuthGuard]  },
  { path: 'reclamacoes' , component: ReclamacoesComponent , canActivate: [AuthGuard] },
  { path: 'sugestoes' , component: SugestoesComponent , canActivate: [AuthGuard] }
  ]},
  { path: 'login', component: LoginComponent }


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
