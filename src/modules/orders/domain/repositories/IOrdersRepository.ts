import { ICreateOrder } from './../models/ICreateOrder';
import { IOrder } from './../models/IOrder';
import Order from '@modules/orders/infra/typeorm/entities/Order';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;

  createOrder(createOrder: ICreateOrder): Promise<IOrder>;
}
