import { IProduct } from './../domain/models/IProduct';
import { IProductRepository } from './../domain/repositories/IProductRepository';
import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';

export interface IProductCreate {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(@inject('ProductsRepository') private productsRepository: IProductRepository) {}

  public async execute({ name, price, quantity }: IProductCreate): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name);

    const redisCache = new RedisCache();

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
