import { IProduct } from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import { ICustomer } from './../../../customers/domain/models/ICustomer';

export interface ICreateOrder {
  customer: ICustomer;
  products: IProduct[];
}
