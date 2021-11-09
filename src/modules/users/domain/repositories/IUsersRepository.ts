import { IUser } from './../models/IUser';

export interface IUsersRepository {
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;

  create(user: IUser): Promise<IUser | undefined>;

  find(): Promise<IUser[] | undefined>;
}
