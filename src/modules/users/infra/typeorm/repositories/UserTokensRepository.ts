import { IUserToken } from './../../../domain/models/IUserToken';
import { IUsersTokensRepository } from './../../../domain/repositories/IUsersTokensRepository';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
class UserTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);
    return userToken;
  }
}

export default UserTokensRepository;
