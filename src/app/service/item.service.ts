import { Injectable } from '@angular/core';
import { Item } from '../model/item.model';

@Injectable()
export class ItemService {

  constructor() { }

  async findAll() {
    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        if (keys[i] !== 'currentUser') {
          values.push( localStorage.getItem(keys[i]) );
        }
    }

    const items = new Array<Item>();
    values.forEach(item => items.push(item));

    return items;
  }

  setItem(item: Item) {
    localStorage.setItem(item.cdItem, JSON.stringify(item));
  }

  getItem(item: Item) {
      return localStorage.getItem(item.cdItem);
  }

  removeItem(item: Item) {
      return localStorage.removeItem(item.cdItem);
  }

}
