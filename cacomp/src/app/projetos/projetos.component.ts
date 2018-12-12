import { Component, OnInit } from '@angular/core';
import { Projetos } from './projetos';
import { ProjetosService } from '../projetos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})

export class ProjetosComponent implements OnInit {

  projetos: Projetos[];
  projetosSelecionado: Projetos;
  projetosNovo: Projetos;

  constructor(private projetosService: ProjetosService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadProjetos();
  }

  loadProjetos(): void {
    this.projetosService.getProjetos().subscribe(
      projetos => this.projetos = projetos
    );
  }

  editar(projetos: Projetos, content): void {
    this.projetosSelecionado = projetos;
    this.modalService.open(content, {ariaLabelledBy: 'modal-editar-projetos'}).result.then((projetosForm : NgForm) => {
      this.projetosSelecionado.nomeProjeto = projetosForm.value.nomeProjeto;
      this.projetosSelecionado.dataProjeto = projetosForm.value.dataProjeto;
      this.projetosSelecionado.membro1 = projetosForm.value.membro1;
      this.projetosSelecionado.membro2 = projetosForm.value.membro2;
      this.projetosSelecionado.membro3 = projetosForm.value.membro3;
      this.projetosSelecionado.observacoes = projetosForm.value.observacoes;


      this.salvar(this.projetosSelecionado);
    });
  }

  selecionarProjetos(projetos: Projetos): void {
    this.projetosSelecionado = projetos;
  }

  salvar(projetos: Projetos): void {
    this.projetosService.atualizarProjetos(projetos).subscribe();
  }

  apagar(projetos: Projetos): void {
    this.projetosService.apagarProjetos(projetos).subscribe();
    this.projetos = this.projetos.filter(a => a !== projetos);
  }

  adicionar(content): void {
    this.projetosNovo = new Projetos();
    this.modalService.open(content, {ariaLabelledBy: 'modal-adicionar-projetos'}).result.then((projetosFormAdicionar : NgForm) => {
      //this.ProjetosNovo.nome = ProjetosFormAdicionar.value.nome_adicionar;
      //this.ProjetosNovo.email = ProjetosFormAdicionar.value.email_adicionar;
      //this.ProjetosNovo.cargo = ProjetosFormAdicionar.value.cargo_adicionar;

      this.salvarNovoProjetos(this.projetosNovo);
      this.projetos.push(this.projetosNovo);

    });
  }

  cancelar(): void {
    this.projetosNovo = null;
  }

  salvarNovoProjetos(projetos : Projetos): void {
    this.projetosService.adicionar(projetos).subscribe();
  }
}