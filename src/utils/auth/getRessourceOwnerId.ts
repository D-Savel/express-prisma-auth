import { Request } from 'express';
import entitiesFromRequest from '../../utils/common/entitiesFromRequest';
export const getResourceOwnerId = (req: Request): string | null => {
  const { fields, search, page, limit, sort, order, filter, ...queryKeys } = req.query;
  const entities = entitiesFromRequest(req); // DB entities object in lowercase
  const primaryEntity = entities.singular!.primaryEntity;
  const secondaryEntity = entities.singular!.secondaryEntity;
  if (primaryEntity === 'user' || secondaryEntity === 'user') {
    if (req.params.id) {
      return req.params.id as string;
    }
    if (queryKeys.id && primaryEntity === 'user') {
      return queryKeys.id as string;
    }
  }
  return null;
};