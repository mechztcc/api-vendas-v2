import { IProduct } from './../../../domain/models/IProduct';

import { IProductRepository } from './../../../domain/repositories/IProductRepository';
import { EntityRepository, In, Repository, getRepository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async find(): Promise<IProduct[]> {
    const products = await this.ormRepository.find();
    return products;
  }

  public async findOne(id: string): Promise<IProduct> {
    const product = await this.ormRepository.findOne(id);
    return product;
  }
  public async remove(product: Product): Promise<IProduct> {
    const productRemoved = await this.ormRepository.remove(product);
    return productRemoved;
  }

  public async create(product: IProduct): Promise<IProduct> {
    const productCreated = await this.ormRepository.create(product);
    return productCreated;
  }
  public async save(product: IProduct): Promise<IProduct> {
    const productCreated = await this.ormRepository.create(product);
    return productCreated;
  }

  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
    const productIds = products.map(product => product.id);
    const existsProducts = await this.ormRepository.find({ where: { id: In(productIds) } });

    return existsProducts;
  }
}
