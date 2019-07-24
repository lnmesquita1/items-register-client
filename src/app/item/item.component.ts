import { Component, OnInit, Input, Output } from '@angular/core';
import { Item } from '../model/item.model';
import { ItemService } from '../service/item.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Item[];
  msgs: Message[] = [];
  @Input() selectedItem: Item;

  constructor(private itemService: ItemService, private router: Router,
    private confirmationService: ConfirmationService) { }

  async ngOnInit() {
    this.findAll();
  }

  findAll() {
    this.itemService.findAll().then(items => {
      this.items = [
        ...items
      ];
    });
  }

  onDeleteItem(cdItem: string) {
    this.confirm(cdItem);
  }

  confirm(cdItem) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir o item ${cdItem} ?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.itemService.removeItem(cdItem);
        this.msgs = [{severity: 'success', summary: 'Operação realizada!', detail: 'Item excluído com sucesso!'}];
        this.findAll();
      }
    });
  }

  onEditItem(cdItem: string) {
    this.router.navigate(['/item/edit', { cdItem: cdItem }]);
  }

  dataFormatada(date: string) {
    const data = new Date(date);
        const dia  = data.getDate().toString();
        const diaF = (dia.length === 1) ? '0' + dia : dia;
        const mes  = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
        const mesF = (mes.length === 1) ? '0' + mes : mes;
        const anoF = data.getFullYear();
    return diaF + '/' + mesF + '/' + anoF;
}

}
