import User from '@modules/users/infra/typeorm/entities/User';
import { string } from 'joi';
import { FakeUsersRepository } from './../../domain/repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUserService';

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUsersService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'User 01',
      email: 'Email@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(typeof user.password).toBe('string');
  });
});
