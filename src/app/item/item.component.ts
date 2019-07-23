import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../model/item.model';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() items: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.findAll().then(items => this.items = items);
  }

}
