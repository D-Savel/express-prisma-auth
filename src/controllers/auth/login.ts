import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../../utils/auth/jwt';
import { addRefreshTokenToWhitelist } from '../../services/auth/refreshToken.services';
import { findUserByEmail } from '../../services/user/user.services';
import { AuthError401 } from '../../errors/authError401';

export async function login(req: Request, res: Response, next: NextFunction) {

  const { email, password } = req.body.payload;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      throw new AuthError401('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user!.password);

    if (!isPasswordValid) {
      throw new AuthError401('Invalid email or password');
    }

    const { password: pw, createdAt: created, updatedAt: updated, ...userForToken } = user!;
    const { id, role, ...securedUser } = userForToken!;

    // Generate JWT tokens
    const { accessToken, refreshToken } = generateTokens(userForToken!);
    await addRefreshTokenToWhitelist({ refreshToken, userId: user!.id });
    res
      .cookie('accessToken', accessToken, {
        maxAge: 2 * 60 * 1000,
        sameSite: 'none',
        secure: true
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true
      })
      .send({
        user: [securedUser]
      });
  } catch (error) {
    next(error);
  }
}