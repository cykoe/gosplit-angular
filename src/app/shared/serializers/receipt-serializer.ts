import { Receipt } from '../models/receipt';

export class ReceiptSerializer {
  static fromJson(json: any): Receipt | object {
    const receipt: Receipt = {};
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
    receipt.payer = json.payer;
    receipt.people = json.people;

    return receipt;
  }

  static toJson(receipt: Receipt): object {
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
      payer: receipt.payer,
      people: receipt.people,
    };
  }
}
