import { Component, OnInit } from '@angular/core';
import { Sugestoes } from './sugestoes';
import { SugestoesService } from '../sugestoes.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.css']
})

export class SugestoesComponent implements OnInit {

  sugestoes: Sugestoes[];
  sugestoesSelecionado: Sugestoes;
  sugestoesNovo: Sugestoes;

  constructor(private sugestoesService: SugestoesService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadSugestoes();
  }

  loadSugestoes(): void {
    this.sugestoesService.getSugestoes().subscribe(
      sugestoes => this.sugestoes = sugestoes
    );
  }

  editar(sugestoes: Sugestoes, content): void {
    this.sugestoesSelecionado = sugestoes;
    this.modalService.open(content, {ariaLabelledBy: 'modal-editar-sugestoes'}).result.then((sugestoesForm : NgForm) => {
      this.sugestoesSelecionado.nomeSugestao = sugestoesForm.value.nomeSugestao;
      this.sugestoesSelecionado.descricaoSugestao = sugestoesForm.value.descricaoSugestao;


      this.salvar(this.sugestoesSelecionado);
    });
  }

  selecionarsugestoes(sugestoes: Sugestoes): void {
    this.sugestoesSelecionado = sugestoes;
  }

  salvar(sugestoes: Sugestoes): void {
    this.sugestoesService.atualizarSugestoes(sugestoes).subscribe();
  }

  apagar(sugestoes: Sugestoes): void {
    this.sugestoesService.apagarSugestoes(sugestoes).subscribe();
    this.sugestoes = this.sugestoes.filter(a => a !== sugestoes);
  }

  adicionar(content): void {
    this.sugestoesNovo = new Sugestoes();
    this.modalService.open(content, {ariaLabelledBy: 'modal-adicionar-sugestoes'}).result.then((sugestoesFormAdicionar : NgForm) => {
      //this.sugestoesNovo.nome = sugestoesFormAdicionar.value.nome_adicionar;
      //this.sugestoesNovo.email = sugestoesFormAdicionar.value.email_adicionar;
      //this.sugestoesNovo.cargo = sugestoesFormAdicionar.value.cargo_adicionar;

      this.salvarNovoSugestoes(this.sugestoesNovo);
      this.sugestoes.push(this.sugestoesNovo);

    });
  }

  cancelar(): void {
    this.sugestoesNovo = null;
  }

  salvarNovoSugestoes(sugestoes : Sugestoes): void {
    this.sugestoesService.adicionar(sugestoes).subscribe();
  }
}