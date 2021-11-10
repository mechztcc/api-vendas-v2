import { IUsersRepository } from './../IUsersRepository';
import { IUser } from '../../models/IUser';
import { v4 as uuidv4 } from 'uuid';
import User from '@modules/users/infra/typeorm/entities/User';

export class FakeUsersRepository implements IUsersRepository {
  public user1 = new User();
  private users: IUser[] = [];

  constructor() {
    (this.user1.id = '2'),
      (this.user1.name = 'Teste'),
      (this.user1.email = 'user@email.com'),
      (this.user1.password = '123123'),
      (this.user1.avatar = null),
      this.users.push(this.user1);
  }

  findByName(name: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

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
