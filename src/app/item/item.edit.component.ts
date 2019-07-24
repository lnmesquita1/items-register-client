import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from '../model/item.model';
import { unidades, Unidade } from '../model/unidade.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item.edit',
  templateUrl: './item.edit.component.html',
  styleUrls: ['./item.edit.component.css']
})
export class ItemEditComponent implements OnInit {

  @Input() unidades = null;
  selectedItem: Item;

  @Input() quantidade;

  @Input() un: string;
  produtoPerecivel: boolean;
  @Input() unidade: Unidade;
  @Input() preco: string;

  constructor(private route: ActivatedRoute, private itemService: ItemService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const cdItem = params['cdItem'];
      this.selectedItem = this.itemService.getItem(cdItem);
    });
    this.unidades = unidades;


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

  salvar(form: NgForm) {
    const item = new Item();
    item.cdItem = this.itemService.getNextCdCode().toString();
    item.dsItem = form.value.nomeItem;
    item.dtFabricacao = form.value.dataFabricacao;
    item.dtValidade = form.value.dataValidade;
    item.preco = form.value.preco;
    item.produtoPerecivel = form.value.produtoPerecivel;
    item.qtd = form.value.quantidade;
    item.unidade = form.value.unidade;
    this.itemService.setItem(item).then(() => console.log('Salvo com sucesso'));
  }

}
