
import { PrismaPromise } from "@prisma/client";
import { hashToken } from "../../utils/auth/hashToken";
import prisma from "../../utils/db/prismaInstance";

interface AddRefreshTokenParams {
  refreshToken: string;
  userId: string;
}

// Add refresh token to whitelist
function addRefreshTokenToWhitelist({ refreshToken, userId }: AddRefreshTokenParams): PrismaPromise<unknown> {

  return prisma.refreshToken.create({
    data: {
      hashedToken: hashToken(refreshToken),
      userId,
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    },
  });
}

// used to check if the token sent by the client is in the database.
function findRefreshToken(refreshToken: string) {
  return prisma.refreshToken.findUnique({
    where: {
      hashedToken: hashToken(refreshToken),
    },
  });
}

// soft delete tokens by id after usage.
function deleteRefreshTokenById(id: string) {
  return prisma.refreshToken.delete({
    where: {
      id,
    },
  });
}

// revoke token by id after usage.
function revokeRefreshTokenById(id: string) {
  return prisma.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

// revoke tokens for user
function revokeRefreshTokens(userId: string) {
  return prisma.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
}

export {
  findRefreshToken,
  revokeRefreshTokenById,
  revokeRefreshTokens,
  deleteRefreshTokenById,
  addRefreshTokenToWhitelist,
};
