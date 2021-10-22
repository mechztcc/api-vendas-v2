import { Request, Response } from 'express';
import CreateSessionsService from '../../../services/CreateSessionsService';
import ResetPasswordService from '../../../services/ResetPasswordService';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({ password, token });

    return response.status(204).json();
  }
}

export default ResetPasswordController;
