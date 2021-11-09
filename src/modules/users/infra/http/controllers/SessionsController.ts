import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateSessionsService from '../../../services/CreateSessionsService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionsService);

    const user = await createSession.execute({ email, password });

    return response.json(classToClass(user));
  }
}

export default SessionsController;
