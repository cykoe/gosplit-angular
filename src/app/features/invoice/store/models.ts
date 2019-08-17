import { EntityState } from '@ngrx/entity';

export interface IItem {
  id: string;
  name: string;
  price: number;
  image: string;
  receiptId?: string;
  personIds?: string[];
}

export interface ItemState extends EntityState<IItem> {
  selectItemId: string | null;
}

export interface IPerson {
  id?: string;
  name: string;
  selection?: boolean;
  price?: number;
  isDriver?: boolean;
  isPassenger?: boolean;
  groupId?: string;
}

export interface PersonState extends EntityState<IPerson> {}

export interface IReceipt {
  id: string;
  subtotal: number;
  total: number;
  tax: number;
  date: string;
  store: string;
  userId: string;
  groupId: string;
  payer: string;
  list: IItem[];
  people: IPerson[];
  image?: any;
  name?: string;
}

export interface ReceiptState extends EntityState<IReceipt> {
  selectReceiptId: string | null;
  isLoading: boolean;
  error?: any;
}
