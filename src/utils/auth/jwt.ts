import jwt, { Secret } from 'jsonwebtoken';
import crypto from 'node:crypto';
import { User } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_TIME = Number(process.env.ACCESS_TOKEN_TIME);
const REFRESH_TOKEN_TIME = Number(process.env.REFRESH_TOKEN_TIME);

// Usually I keep the token between 5 minutes - 15 minutes
function generateAccessToken(user: Partial<User>) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_ACCESS_SECRET as Secret, {
    algorithm: 'HS256', // Explicitly specify algorithm
    expiresIn: ACCESS_TOKEN_TIME, // Short - lived tokens
    jwtid: crypto.randomBytes(16).toString('hex'), // Unique token ID
  });
}

// Generate refreshToken
function generateRefreshToken(user: Partial<User>) {
  return jwt.sign({ user }, process.env.JWT_REFRESH_SECRET as Secret, {
    algorithm: 'HS256', // Explicitly specify algorithm
    expiresIn: REFRESH_TOKEN_TIME,
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
