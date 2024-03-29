import { FakeUsersRepository } from './../../domain/repositories/fakes/FakeUsersRepository';
import ListUserService from './ListUserService';

describe('ListUser', () => {
  it('Should be able to list All users', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const listUser = new ListUserService(fakeUsersRepository);

    const users = await listUser.execute();

    expect(users).toBeInstanceOf(Array);
  });
});
