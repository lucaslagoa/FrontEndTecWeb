import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembrosComponent } from './membros/membros.component';
import { ReclamacoesComponent } from './reclamacoes/reclamacoes.component';
import { GastoComponent } from './gasto/gasto.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { SugestoesComponent } from './sugestoes/sugestoes.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/login-auth.guard';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    MembrosComponent,
    ReclamacoesComponent,
    GastoComponent,
    ProjetosComponent,
    SugestoesComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MainComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
