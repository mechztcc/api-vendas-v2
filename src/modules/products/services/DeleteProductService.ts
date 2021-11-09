import { IProductRepository } from './../domain/repositories/IProductRepository';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(@inject('ProductsRepository') private productsRepository: IProductRepository) {}

  public async execute({ id }: IRequest): Promise<void> {
    const redisCache = new RedisCache();

    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
