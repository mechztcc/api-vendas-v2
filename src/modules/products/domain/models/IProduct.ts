import { IOrdersProducts } from './../../../orders/domain/models/IOrdersProducts';

export interface IProduct {
  id?: string;

  order_products: IOrdersProducts[];

  name: string;

  price: number;

  quantity: number;

  created_at?: Date;

  updated_At?: Date;
}
