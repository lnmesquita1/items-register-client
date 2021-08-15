import { Component, OnInit, Input, Output } from '@angular/core';
import { Item } from '../model/item.model';
import { ItemService } from '../service/item.service';
import { Router } from '@angular/router';
import { ConfirmationService, Message } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Item[];
  msgs: Message[] = [];
  cdItem: string = null;
  @Input() selectedItem: Item;

  constructor(private itemService: ItemService, private router: Router,
    private confirmationService: ConfirmationService, private modalService: NgbModal) { }

  async ngOnInit() {
    this.findAll();
  }

  redirectToList() {
    this.router.navigate(['/item/edit']);
  }

  findAll() {
    this.itemService.findAll().then(items => {
      this.items = [
        ...items
      ];
    });
  }

  onDeleteItem(cdItem: string, content) {
    this.cdItem = cdItem;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${reason}`);
    });
  }

  confirmDeleteItem(modal) {
    this.removeItem().then(() => {
      this.findAll();
      modal.close();
    });
  }

  removeItem() {
    return new Promise((resolve, reject) => {
      resolve(this.itemService.removeItem(this.cdItem));
    });
  }

  onEditItem(cdItem: string) {
    this.router.navigate(['/item/edit', { cdItem: cdItem }]);
  }

  dataFormatada(date: string) {
    const data = this.stringBrlDateToDate(date);
        const dia  = data.getDate().toString();
        const diaF = (dia.length === 1) ? '0' + dia : dia;
        const mes  = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
        const mesF = (mes.length === 1) ? '0' + mes : mes;
        const anoF = data.getFullYear();
    return diaF + '/' + mesF + '/' + anoF;
  }

  stringBrlDateToDate(date: string) {
    const splitDate = date.split('-');
    const year = parseInt(splitDate[2]);
    const month = parseInt(splitDate[1])-1;
    const day = parseInt(splitDate[0]);
    return new Date(year, month, day);
  }

}
