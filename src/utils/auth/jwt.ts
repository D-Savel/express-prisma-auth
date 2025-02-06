import jwt, { Secret } from 'jsonwebtoken';
import crypto from 'node:crypto';
import { User } from '@prisma/client';
import * as dotenv from 'dotenv';

// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(user: Partial<User>) {
  return jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET as Secret, {
    algorithm: 'HS256', // Explicitly specify algorithm
    expiresIn: '1m',
    jwtid: crypto.randomBytes(16).toString('hex'), // Unique token ID
  });
}

// Generate refreshToken
function generateRefreshToken(user: Partial<User>) {
  return jwt.sign({ user }, process.env.JWT_REFRESH_SECRET as Secret, {
    algorithm: 'HS256', // Explicitly specify algorithm
    expiresIn: '7d',// Short - lived tokens
    jwtid: crypto.randomBytes(16).toString('hex'), // Unique token ID
  });
}

function generateTokens(user: Partial<User>) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
}

export {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
