import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthError401 } from '../../errors/authError401';
import { Role, User } from '@prisma/client';
import { decode } from 'punycode';

interface JwtPayload {
  id: string;
  exp: number;
  role: Role;
};

declare module 'express' {
  export interface Request {
    user?: Partial<User>;
  }
}

async function isAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken && !refreshToken) {
      throw new AuthError401('Unauthorized: Invalid or expired token');
    }
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!) as JwtPayload;
    console.log('JWT : ', decoded);
    res.locals.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error: any) {
    return next(error);
  }
};
export default isAuth;