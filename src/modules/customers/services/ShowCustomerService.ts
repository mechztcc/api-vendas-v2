import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import { CustomersRepository } from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowCustomerService {
  constructor(@inject('CustomersRepository') private customersRepository: ICustomersRepository) {}

  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
