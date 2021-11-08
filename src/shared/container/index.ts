import { IUsersRepository } from './../../modules/users/domain/repositories/IUsersRepository';
import { IOrdersRepository } from './../../modules/orders/domain/repositories/IOrdersRepository';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

import { container } from 'tsyringe';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
