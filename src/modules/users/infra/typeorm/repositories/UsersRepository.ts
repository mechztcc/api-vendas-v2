import { IUser } from './../../../domain/models/IUser';
import { IUsersRepository } from './../../../domain/repositories/IUsersRepository';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { name } });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id } });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async create(user: IUser): Promise<User | undefined> {
    const userCreated = await this.ormRepository.create(user);
    return userCreated;
  }
}

export default UsersRepository;
