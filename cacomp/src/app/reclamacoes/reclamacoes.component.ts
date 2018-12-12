import { Component, OnInit } from '@angular/core';
import { Reclamacoes } from './reclamacoes';
import { ReclamacoesService } from '../reclamacoes.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-reclamacoes',
  templateUrl: './reclamacoes.component.html',
  styleUrls: ['./reclamacoes.component.css']
})

export class ReclamacoesComponent implements OnInit {

  reclamacoes: Reclamacoes[];
  reclamacoesSelecionado: Reclamacoes;
  reclamacoesNovo: Reclamacoes;

  constructor(private reclamacoesService: ReclamacoesService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadReclamacoes();
  }

  loadReclamacoes(): void {
    this.reclamacoesService.getReclamacoes().subscribe(
      reclamacoes => this.reclamacoes = reclamacoes
    );
  }

  editar(reclamacoes: Reclamacoes, content): void {
    this.reclamacoesSelecionado = reclamacoes;
    this.modalService.open(content, {ariaLabelledBy: 'modal-editar-reclamacoes'}).result.then((reclamacoesForm : NgForm) => {
      this.reclamacoesSelecionado.nome = reclamacoesForm.value.nome;
      this.reclamacoesSelecionado.materia = reclamacoesForm.value.materia;
      this.reclamacoesSelecionado.data = reclamacoesForm.value.data;
      this.reclamacoesSelecionado.assunto = reclamacoesForm.value.assunto;

      this.salvar(this.reclamacoesSelecionado);
    });
  }

  selecionarreclamacoes(reclamacoes: Reclamacoes): void {
    this.reclamacoesSelecionado = reclamacoes;
  }

  salvar(reclamacoes: Reclamacoes): void {
    this.reclamacoesService.atualizarReclamacoes(reclamacoes).subscribe();
  }

  apagar(reclamacoes: Reclamacoes): void {
    this.reclamacoesService.apagarReclamacoes(reclamacoes).subscribe();
    this.reclamacoes = this.reclamacoes.filter(a => a !== reclamacoes);
  }

  adicionar(content): void {
    this.reclamacoesNovo = new Reclamacoes();
    this.modalService.open(content, {ariaLabelledBy: 'modal-adicionar-reclamacoes'}).result.then((reclamacoesFormAdicionar : NgForm) => {
      //this.reclamacoesNovo.nome = reclamacoesFormAdicionar.value.nome_adicionar;
      //this.reclamacoesNovo.email = reclamacoesFormAdicionar.value.email_adicionar;
      //this.reclamacoesNovo.cargo = reclamacoesFormAdicionar.value.cargo_adicionar;

      this.salvarNovoReclamacoes(this.reclamacoesNovo);
      this.reclamacoes.push(this.reclamacoesNovo);

    });
  }

  cancelar(): void {
    this.reclamacoesNovo = null;
  }

  salvarNovoReclamacoes(reclamacoes : Reclamacoes): void {
    this.reclamacoesService.adicionar(reclamacoes).subscribe();
  }
}