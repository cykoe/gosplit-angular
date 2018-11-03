import { Injectable } from '@angular/core';
import { Receipt } from '../models/receipt';

@Injectable({
  providedIn: 'root'
})
export class ReceiptSerializer {
  fromJson(json: any): Receipt {
    if (json.status)
      return json;
    const receipt = new Receipt();
    receipt.id = json._id;
    receipt.subtotal = json.subtotal;
    receipt.total = json.total;
    receipt.tax = json.tax;
    receipt.date = json.date;
    receipt.list = json.list;
    receipt.store = json.store;
    receipt.length = json.length;
    receipt.split = json.split;
    receipt.driverList = json.driverList;
    receipt.numberChart = json.numberChart;
    receipt.booleanChart = json.booleanChart;
    receipt.selectAllPrice = json.selectAllPrice;

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
      driverList: receipt.driverList,
      numberChart: receipt.numberChart,
      booleanChart: receipt.booleanChart,
      selectAllPrice: receipt.selectAllPrice,
    };
  }
}
