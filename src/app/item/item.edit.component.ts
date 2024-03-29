import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../model/item.model';
import { unidades, Unidade } from '../model/unidade.model';
import { NgForm } from '@angular/forms';
import { Message } from 'primeng/api';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from './custom-adapter.service';
import { CustomDateParserFormatter } from './custom-date-parser-formatter.service';

@Component({
  selector: 'app-item.edit',
  templateUrl: './item.edit.component.html',
  styleUrls: ['./item.edit.component.css'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class ItemEditComponent implements OnInit {

  @Input() _unidades = unidades;
  toSaveItem = new Item();

  @Input() quantidade;

  msgs: Message[] = [];

  cdItem: string;
  @Input() un: string;
  @Input() produtoPerecivel = false;
  @Input() unidade: Unidade;
  @Input() preco: string;
  @Input() nomeItem: string;
  @Input() dataValidade: Date;
  @Input() dataFabricacao: Date;

  nomeItemValidation = false;
  dataFabricacaoValidation = false;
  dataValidadeValidation = false;
  precoValidation = false;
  unidadeValidation = false;

  mensagemCampoObrigatorio = 'Este campo é obrigatório!';
  mensagemGlobal = 'Formulário não está válido. Verifique os campos. ';

  constructor(private route: ActivatedRoute, private itemService: ItemService, private router: Router) { }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      const cdItem = params['cdItem'];
      if (cdItem) {
        this.getItem(cdItem).then(item => {
          this.bindItemOnEdit(item);
        });
      }
    });
  }

  bindItemOnEdit(item) {
    if (!this.unidade) {
      this.unidade = new Unidade();
      this.unidade.label = item.unidade.label;
      this.unidade.value = item.unidade.value;
    }
    this.cdItem = item.cdItem;
    this.preco = item.preco;
    this.nomeItem = item.dsItem;
    this.quantidade = item.qtd;
    this.dataValidade = new Date(item.dtValidade);
    this.dataFabricacao = new Date(item.dtFabricacao);
    this.produtoPerecivel = item.produtoPerecivel;
  }

  async getItem(cdItem) {
    return await this.itemService.getItem(cdItem);
  }

  verificaAbreviaturaUnidade(event) {
    if (this.unidade.value === 0) {
      this.un = 'lt';
    } else if (this.unidade.value === 1) {
      this.un = 'kg';
    } else if (this.unidade.value === 2) {
      this.un = 'un';
    }
  }

  validar(form: NgForm) {
    const dtFabricacao = this.stringBrlDateToDate(form.value.dataFabricacao);
    const perecivel = form.value.produtoPerecivel;
    const dtValidade = this.stringBrlDateToDate(form.value.dataValidade);
    this.verificaCamposPreenchidos(form);
    if (!form.valid) {
      this.verificaCamposPreenchidos(form);
      this.showWarn(this.mensagemGlobal);
    } else {
      if (dtValidade < new Date()) {
        this.showWarn('A data de validade é menor que a data de hoje. O item está vencido!');
      } else if (perecivel && dtFabricacao > dtValidade) {
        this.showWarn('Regra para produto perecível: A data de fabricação não pode ser superior a data de validade!');
      } else {
        this.salvar(form);
        this.showSuccess();
        form.resetForm();
      }
    }
  }

  verificaCamposPreenchidos(form) {
    this.nomeItemValidation = form.controls.nomeItem.status === 'INVALID';
    this.dataFabricacaoValidation = form.controls.dataFabricacao.status === 'INVALID';
    this.dataValidadeValidation = form.controls.dataValidade.status === 'INVALID';
    this.precoValidation = form.controls.preco.status === 'INVALID';
    this.unidadeValidation = form.controls.unidade.status === 'INVALID';
  }

  redirectToList() {
    this.router.navigate(['/item']);
  }

  salvar(form: NgForm) {
    this.toSaveItem.cdItem = this.cdItem ? this.cdItem : this.itemService.getNextCdCode().toString();
    this.toSaveItem.dsItem = form.value.nomeItem;
    this.toSaveItem.dtFabricacao = form.value.dataFabricacao;
    this.toSaveItem.dtValidade = form.value.dataValidade;
    this.toSaveItem.preco = form.value.preco;
    this.toSaveItem.produtoPerecivel = form.value.produtoPerecivel;
    this.toSaveItem.qtd = form.value.quantidade;
    this.toSaveItem.unidade = form.value.unidade;
    this.itemService.setItem(this.toSaveItem).then(() => {
      this.cdItem = null;
      console.log('Salvo com sucesso');
    });
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'alert-success', summary: 'Operação efetuada', detail: 'Item salvo com sucesso!' });
  }

  showWarn(mensagem) {
    this.msgs = [];
    this.msgs.push({ severity: 'alert-warning', summary: 'Atenção! ', detail: mensagem });
  }

  stringBrlDateToDate(date: string) {
    const splitDate = date.split('-');
    const year = parseInt(splitDate[2]);
    const month = parseInt(splitDate[1])-1;
    const day = parseInt(splitDate[0]);
    return new Date(year, month, day);
  }

}
