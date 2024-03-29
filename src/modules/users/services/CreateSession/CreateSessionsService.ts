import { IUsersRepository } from '../../domain/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../../config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../../infra/typeorm/entities/User';
import UsersRepository from '../../infra/typeorm/repositories/UsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../../domain/models/IUser';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
class CreateSessionsService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // Validate more formats before call compare mathod.
    // compare use alot of memory
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionsService;
