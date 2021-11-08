import { IOrdersRepository } from './../../modules/orders/domain/repositories/IOrdersRepository';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

import { container } from 'tsyringe';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);
