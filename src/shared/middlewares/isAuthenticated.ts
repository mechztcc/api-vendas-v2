import authConfig from '../../config/auth';

import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing');
  }

  // Bearer huehdkaksu12312jjdkau2312
  const [bearer, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    // sub is a Id of user
    // Override type Request at src/@types/express/index.d.ts
    // The main object of this changes, is turn visible the id of user, to all request
    // That this method intercep
    const { sub } = decodedToken as ITokenPayload;
    request.user = { id: sub };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.');
  }
}
