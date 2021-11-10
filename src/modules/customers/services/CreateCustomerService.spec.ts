import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import ShowCustomerService from './ShowCustomerService';
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

  it('Should not be able to create a two customer with the same email', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    await createCustomer.execute({
      name: 'Alberto Paiva',
      email: 'email@email.com',
    });

    expect(
      createCustomer.execute({
        name: 'Alberto Paiva',
        email: 'email@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
