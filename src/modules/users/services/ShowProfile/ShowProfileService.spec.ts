import User from '@modules/users/infra/typeorm/entities/User';
import { FakeUsersRepository } from './../../domain/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

describe('ShowUser', () => {
  it('Should be able to not show a invalid user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const showUser = new ShowProfileService(fakeUsersRepository);

    await expect(showUser.execute({ user_id: '1' })).rejects;
  });

  it('Should be able to show valid user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const showUser = new ShowProfileService(fakeUsersRepository);
    const user = await showUser.execute({ user_id: '2' });

    expect(user.id).toBe('2');
  });
});
