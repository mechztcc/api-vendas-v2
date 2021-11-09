import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProduct } from './../domain/models/IProduct';
import { IProductRepository } from './../domain/repositories/IProductRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(@inject('ProductsRepository') private productsRepository: IProductRepository) {}

  public async execute({ id }: IRequest): Promise<IProduct> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
