import { IUser } from './../domain/models/IUser';
import { IUsersRepository } from './../domain/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<IUser> {
    // const usersRepository = getCustomRepository(UserRepository);

    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPass = await hash(password, 8);

    const user = await this.usersRepository.create({ name, email, password: hashedPass });
    // await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
