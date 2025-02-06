import { Request, Response, NextFunction } from 'express';
import entitiesFromRequest from '../../utils/common/entitiesFromRequest';
import { User } from '@prisma/client';
import { AuthError403 } from '../../errors/authError403';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

function authorize(req: Request, res: Response, next: NextFunction) {
  try {
    let userId: string = '';
    // get query string parameters in queryKeys for queries with entity keys
    const { fields, search, page, limit, sort, order, filter, ...queryKeys } = req.query;
    const entities = entitiesFromRequest(req); // DB entities object in lowercase
    const primaryEntity = entities.singular!.primaryEntity;
    const secondaryEntity = entities.singular!.secondaryEntity;

    if (primaryEntity === 'user' && queryKeys.id) {
      userId = queryKeys.id as string;
    }
    if (primaryEntity === 'user' && req.params.id) {
      userId = req.params.id as string;
    }
    if (secondaryEntity === 'user' && req.params.id) {
      userId = req.params.id as string;
    }

    if (req.user?.id === userId || req.user?.role === 'ADMIN_ROLE') {
      next();
    } else {
      throw new AuthError403('Forbidden: User not authorized to perform this action');
    }
  } catch (error) {
    return next(error);
  }
}

export default authorize;  