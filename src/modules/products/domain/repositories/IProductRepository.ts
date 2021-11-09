import { IProductCreate } from './../../services/CreateProductService';

import { IProduct } from './../models/IProduct';

interface IFindProducts {
  id: string;
}

export interface IProductRepository {
  findByName(name: string): Promise<IProduct | undefined>;

  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;

  create(product: IProductCreate): Promise<IProduct>;

  save(product: IProduct): Promise<IProduct>;
}
