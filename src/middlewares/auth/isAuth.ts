import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthError401 } from '../../errors/authError401';
import { User } from '@prisma/client';

interface JwtPayload {
  user: User;
  exp: number;
};

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

async function isAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken || !refreshToken) {
      throw new AuthError401('Unauthorized: Invalid or expired token');
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
    console.log('JWT : ', decoded);
    req.user = decoded.user;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') { throw new AuthError401('Unauthorized: Token expired'); }
    return next(error);
  }
};
export default isAuth;