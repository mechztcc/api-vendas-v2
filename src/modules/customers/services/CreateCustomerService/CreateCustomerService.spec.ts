import FakeCustomersRepository from '../../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

describe('CreateCustomer', () => {
  it('Should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    const customer = await createCustomer.execute({
      name: 'Alberto Paiva',
      email: 'email@email.com',
    });

    expect(customer).toHaveProperty('id');
  });
  it('Should not be able to create a two customer with the same email', () => {});
});
