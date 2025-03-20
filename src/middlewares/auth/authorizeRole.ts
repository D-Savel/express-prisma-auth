import { Request, Response, NextFunction } from 'express';

import { User } from '@prisma/client';
import { AuthError403 } from '../../errors/authError403';
import { Role } from '@prisma/client';
import prisma from '../../utils/db/prismaInstance';

declare module 'express' {
  export interface Response {
    locals: { user?: Partial<User>; };
  }
}

function authorizeRole(roles: Role[]) {

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (res.locals.user && !roles.includes(res.locals.user.role!)) {
        return new AuthError403(`Forbidden: User not authorized to perform this action`);
      } else {
        return next();
      }
    } catch (error) {
      return next(error);
    }
  };
};

export default authorizeRole;;