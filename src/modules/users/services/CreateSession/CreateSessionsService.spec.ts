import AppError from '@shared/errors/AppError';
import { FakeUsersRepository } from './../../domain/repositories/fakes/FakeUsersRepository';
import CreateSessionsService from './CreateSessionsService';

describe('CreateSessions', () => {
  it('Should be able to not create a session with invalid email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createSession = new CreateSessionsService(fakeUsersRepository);

    expect(
      createSession.execute({ email: 'fakeemail@email.com', password: '123' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
