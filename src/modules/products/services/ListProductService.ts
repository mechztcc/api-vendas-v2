import { ProductRepository } from './../typeorm/repositories/ProductsRepository';
import { getCustomRepository, getRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if(!products) {
      const products = await productsRepository.find();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }


    return products;
  }
}

export default ListProductService;
