import { Injectable } from '@angular/core';
import { Item } from '../model/item.model';

@Injectable()
export class ItemService {

  constructor() { }

  async findAll() {
    const keys = Object.keys(localStorage);
    let i = keys.length;
    const items = new Array<Item>();

    while ( i-- ) {
        if (keys[i] !== 'currentUser') {
          items.push( JSON.parse(localStorage.getItem(keys[i])));
        }
    }

    return items;
  }

  async setItem(item: Item) {
    localStorage.setItem(item.cdItem, JSON.stringify(item));
  }

  getItem(cdItem: string): Item {
      return JSON.parse(localStorage.getItem(cdItem));
  }

  removeItem(item: Item) {
      return localStorage.removeItem(item.cdItem);
  }

  getNextCdCode() {
    return Object.keys(localStorage).length++;
  }

}
