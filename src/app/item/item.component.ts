import { Component, OnInit, Input, Output } from '@angular/core';
import { Item } from '../model/item.model';
import { ItemService } from '../service/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Item[];
  @Input() selectedItem: Item;

  constructor(private itemService: ItemService, private router: Router) { }

  async ngOnInit() {
    this.itemService.findAll().then(items => {
      this.items = [
        ...items
      ];
      console.log(this.items);
    });
  }

  onDeleteItem(item: Item) {
    console.log(item);
  }

  onEditItem(cdItem: string) {
    this.router.navigate(['/item/edit', { cdItem: cdItem }]);
    console.log(cdItem);
  }

}
