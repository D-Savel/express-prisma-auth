import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../../utils/express/sendSuccess';
import { deleteRefreshTokenById } from '../../services/auth/refreshToken.services';
import { User } from '@prisma/client';


interface JwtPayload { userId: string; };

declare module 'express' {
  export interface Request {
    user?: Partial<User>;
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken, accessToken } = req.cookies;
    if (!accessToken || !refreshToken) { throw new Error('access and refresh tokens required'); }
    // Clear tokens cookies
    res.clearCookie('accessToken', {
      sameSite: 'none',
      secure: true
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    deleteRefreshTokenById(req.user?.id as string);
    sendSuccess(res, 200, 'Logged out successfully', null);
  } catch (error) {
    next(error);
  }
};