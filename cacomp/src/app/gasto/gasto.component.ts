import { Component, OnInit } from '@angular/core';
import { Gasto } from './gasto';
import { GastoService } from '../gasto.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styleUrls: ['./gasto.component.css']
})

export class GastoComponent implements OnInit {

  gasto: Gasto[];
  gastoSelecionado: Gasto;
  gastoNovo: Gasto;

  constructor(private gastoService: GastoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadGasto();
  }

  loadGasto(): void {
    this.gastoService.getGasto().subscribe(
      gasto => this.gasto = gasto
    );
  }

  editar(gasto: Gasto, content): void {
    this.gastoSelecionado = gasto;
    this.modalService.open(content, {ariaLabelledBy: 'modal-editar-gasto'}).result.then((gastoForm : NgForm) => {
      this.gastoSelecionado.nomeGasto = gastoForm.value.nomeGasto;
      this.gastoSelecionado.valorGasto = gastoForm.value.valorGasto;
      this.gastoSelecionado.data = gastoForm.value.data;
      this.gastoSelecionado.observacoes = gastoForm.value.observacoes;

      this.salvar(this.gastoSelecionado);
    });
  }

  selecionargasto(gasto: Gasto): void {
    this.gastoSelecionado = gasto;
  }

  salvar(gasto: Gasto): void {
    this.gastoService.atualizarGasto(gasto).subscribe();
  }

  apagar(gasto: Gasto): void {
    this.gastoService.apagarGasto(gasto).subscribe();
    this.gasto = this.gasto.filter(a => a !== gasto);
  }

  adicionar(content): void {
    this.gastoNovo = new Gasto();
    this.modalService.open(content, {ariaLabelledBy: 'modal-adicionar-gasto'}).result.then((gastoFormAdicionar : NgForm) => {
      //this.gastoNovo.nome = gastoFormAdicionar.value.nome_adicionar;
      //this.gastoNovo.email = gastoFormAdicionar.value.email_adicionar;
      //this.gastoNovo.cargo = gastoFormAdicionar.value.cargo_adicionar;

      this.salvarNovoGasto(this.gastoNovo);
      this.gasto.push(this.gastoNovo);

    });
  }

  cancelar(): void {
    this.gastoNovo = null;
  }

  salvarNovoGasto(gasto : Gasto): void {
    this.gastoService.adicionar(gasto).subscribe();
  }
}