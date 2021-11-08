import { ICustomer } from './../../../../customers/domain/models/ICustomer';
import { IOrdersRepository } from './../../../domain/repositories/IOrdersRepository';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

export interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne(id, {
      relations: ['order_products', 'customer'],
    });
    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);
    return order;
  }
}

export default OrdersRepository;
