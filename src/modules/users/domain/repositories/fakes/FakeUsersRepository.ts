import { IUsersRepository } from './../IUsersRepository';
import { IUser } from '../../models/IUser';
import { v4 as uuidv4 } from 'uuid';
import User from '@modules/users/infra/typeorm/entities/User';

export class FakeUsersRepository implements IUsersRepository {
  findByName(name: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  private users: IUser[] = [];

  public async create(user: IUser): Promise<IUser> {
    const userCreated = new User();
    userCreated.id = uuidv4();
    userCreated.name = user.name;
    userCreated.email = user.email;
    userCreated.password = user.password;
    userCreated.avatar = null;

    this.users.push(user);
    return userCreated;
  }

  public async findById(id: string): Promise<IUser> {
    const user = this.users.find(user => {
      return user.id === id;
    });
    return user;
  }

  public async findByEmail(email: string): Promise<IUser> {
    const user = this.users.find(user => {
      return user.email === email;
    });

    return user;
  }

  public async find(): Promise<IUser[]> {
    return this.users;
  }

  save(user: IUser): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
