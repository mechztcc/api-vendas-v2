import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // Validate more formats before call compare mathod.
    // compare use alot of memory
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, 'SecretHash', { subject: user.id, expiresIn: '1d' });

    return { user, token };
  }
}

export default CreateSessionsService;
