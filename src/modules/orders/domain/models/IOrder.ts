import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import { ICustomer } from './../../../customers/domain/models/ICustomer';
export interface IOrder {
  id: string;
  customer: ICustomer;
  order_products: OrdersProducts[];
  created_at: Date;
  updated_at: Date;
}
