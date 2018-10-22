import { Injectable } from '@angular/core';
import { Receipt } from '../models/receipt';

@Injectable({
  providedIn: 'root'
})
export class ReceiptSerializer {
  fromJson(json: any): Receipt {
    const receipt = new Receipt();
    receipt.id = json.id;
    receipt.subtotal = json.subtotal;
    receipt.total = json.total;
    receipt.tax = json.tax;
    receipt.date = json.date;
    receipt.list = json.list;
    receipt.store = json.store;
    receipt.length = json.length;
    receipt.split = json.split;
    receipt.driving = json.driving;
    receipt.image = json.image;

    return receipt;
  }

  toJson(receipt: Receipt): any {
    return {
      id: receipt.id,
      subtotal: receipt.subtotal,
      total: receipt.total,
      tax: receipt.tax,
      date: receipt.date,
      list: receipt.list,
      store: receipt.store,
      length: receipt.length,
      split: receipt.split,
      driving: receipt.driving,
      image: receipt.image,
    };
  }
}
