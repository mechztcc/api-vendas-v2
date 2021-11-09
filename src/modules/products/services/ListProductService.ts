import { IProductRepository } from './../domain/repositories/IProductRepository';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { getCustomRepository, getRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListProductService {
  constructor(@inject('ProductsRepository') private productsRepository: IProductRepository) {}

  public async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if (!products) {
      const products = await this.productsRepository.find();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
