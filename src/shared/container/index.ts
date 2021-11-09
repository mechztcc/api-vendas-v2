import { IProductRepository } from './../../modules/products/domain/repositories/IProductRepository';
import { IUsersTokensRepository } from './../../modules/users/domain/repositories/IUsersTokensRepository';
import { IUsersRepository } from './../../modules/users/domain/repositories/IUsersRepository';
import { IOrdersRepository } from './../../modules/orders/domain/repositories/IOrdersRepository';
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

import { container } from 'tsyringe';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);
container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUsersTokensRepository>('UsersTokensRepository', UserTokensRepository);
container.registerSingleton<IProductRepository>('ProductsRepository', ProductRepository);
