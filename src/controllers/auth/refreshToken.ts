import { NextFunction, Request, Response } from 'express';
import { AuthError401 } from '../../errors/authError401';
import { generateTokens } from '../../utils/auth/jwt';
import { addRefreshTokenToWhitelist, deleteRefreshTokenById, findRefreshToken, revokeRefreshTokens } from '../../services/auth/refreshToken.services';
import { findUserById } from '../../services/user/user.services';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  userId: string;
};

async function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    let { refreshToken } = req.cookies;

    if (!process.env.JWT_REFRESH_SECRET) {
      throw new AuthError401('Access token secret is not defined');
    }

    if (!refreshToken) throw new AuthError401('Refresh token is required');
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: 'none', secure: true });
    const savedRefreshToken = await findRefreshToken(refreshToken);

    if (
      !savedRefreshToken
      || savedRefreshToken.revoked === true
      || Date.now() >= savedRefreshToken.expireAt.getTime()
    ) {// Check if there is user for unvalid refresh token in request. If there is, revoke all refresh tokens for that user
      if ((jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload).userId) {
        const refreshTokenUser = await findUserById(((jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!)) as JwtPayload).userId);
        if (refreshTokenUser) {
          await revokeRefreshTokens(refreshTokenUser.id);
        }
      }
      throw new AuthError401('Unauthorized');
    }

    const savedRefreshTokenUser = await findUserById(savedRefreshToken!.userId);
    const { password: pw, createdAt: created, updatedAt: updated, ...securedUser } = savedRefreshTokenUser!;

    // Proccess for generate new tokens if refresh token is valid and user is found
    if (!savedRefreshTokenUser) {
      throw new Error('Unauthorized');
    }
    await deleteRefreshTokenById(savedRefreshToken!.id);
    // Generate JWT tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(savedRefreshTokenUser);
    await addRefreshTokenToWhitelist({ refreshToken: newRefreshToken, userId: savedRefreshTokenUser.id });
    res
      .cookie('accessToken', accessToken, {
        maxAge: 24 * 60 * 1000,
        sameSite: 'none',
        secure: true
      })
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true
      })
      .send({
        user: securedUser,
      });
  } catch (error) {
    return (next(error));
  }
}

export default refreshToken;