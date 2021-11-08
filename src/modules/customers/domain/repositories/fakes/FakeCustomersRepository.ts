import { ICustomersRepository } from './../ICustomersRepository';
import { ICreateCustomer } from './../../models/ICreateCustomer';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { v4 as uuidv4 } from 'uuid';
import { ICustomer } from '../../models/ICustomer';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  constructor() {}

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);
    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    Object.assign(this.customers, customer);
    return customer;
  }

  public async findAll(customer: Customer): Promise<Customer[] | undefined> {
    return this.customers;
  }

  public async findByName(name: string): Promise<ICustomer> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }
  public async findById(id: string): Promise<ICustomer> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }
  public async findByEmail(email: string): Promise<ICustomer> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
}

export default FakeCustomersRepository;
