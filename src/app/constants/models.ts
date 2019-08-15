export interface IPerson {
  name: string;
  selection: boolean;
  price: number;
  isDriver: boolean;
  isPassenger: boolean;
}

export interface IItem {
  id: string;
  name: string;
  price: number;
  image: string;
  people: IPerson[];
}

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

export interface IError {
  message: string;
}

export interface IGroup {
  id: string;
  name: string;
  people: string[];
}

export interface UploadUrlInfo {
  uploadURL: string;
  name: string;
}
