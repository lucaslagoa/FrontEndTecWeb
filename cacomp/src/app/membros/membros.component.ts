import { Component, OnInit } from '@angular/core';
import { Membros } from './membros';
import { MembrosService } from '../membros.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-membros',
  templateUrl: './membros.component.html',
  styleUrls: ['./membros.component.css']
})

export class MembrosComponent implements OnInit {

  membros: Membros[];
  membrosSelecionado: Membros;
  membrosNovo: Membros;

  constructor(private membrosService: MembrosService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadMembros();
  }

  loadMembros(): void {
    this.membrosService.getMembros().subscribe(
      membros => this.membros = membros
    );
  }

  editar(membros: Membros, content): void {
    this.membrosSelecionado = membros;
    this.modalService.open(content, {ariaLabelledBy: 'modal-editar-membros'}).result.then((membrosForm : NgForm) => {
      this.membrosSelecionado.nome = membrosForm.value.nome;
      this.membrosSelecionado.email = membrosForm.value.email;
      this.membrosSelecionado.cargo = membrosForm.value.cargo;
      this.membrosSelecionado.password = membrosForm.value.password;

      this.salvar(this.membrosSelecionado);
    });
  }

  selecionarMembros(membros: Membros): void {
    this.membrosSelecionado = membros;
  }

  salvar(membros: Membros): void {
    this.membrosService.atualizarMembros(membros).subscribe();
  }

  apagar(membros: Membros): void {
    this.membrosService.apagarMembros(membros).subscribe();
    this.membros = this.membros.filter(a => a !== membros);
  }

  adicionar(content): void {
    this.membrosNovo = new Membros();
    this.modalService.open(content, {ariaLabelledBy: 'modal-adicionar-membros'}).result.then((membrosFormAdicionar : NgForm) => {
      //this.membrosNovo.nome = membrosFormAdicionar.value.nome_adicionar;
      //this.membrosNovo.email = membrosFormAdicionar.value.email_adicionar;
      //this.membrosNovo.cargo = membrosFormAdicionar.value.cargo_adicionar;

      this.salvarNovoMembros(this.membrosNovo);
      this.membros.push(this.membrosNovo);

    });
  }

  cancelar(): void {
    this.membrosNovo = null;
  }

  salvarNovoMembros(membros : Membros): void {
    this.membrosService.adicionar(membros).subscribe();
  }
}