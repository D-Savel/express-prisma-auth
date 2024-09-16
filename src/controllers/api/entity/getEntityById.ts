import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../../utils/express/sendSuccess.js";
import { Prisma } from '@prisma/client';
import { getOneByOneParam } from "../../../services/crud/dbRequest.js";
import extractEntityFromRequest from "../../../utils/common/extractEntityfromRequest.js";
import capitalizeFirstLetter from "../../../utils/common/capitalizeFirstLetter.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Path', path.basename(__dirname));

const getEntityById = async (req: Request, res: Response, next: NextFunction) => {
  const entity = extractEntityFromRequest(req)!;
  console.log('ENTITY in getEntityById', entity);
  try {
    if (Object.values(Prisma.ModelName).includes(capitalizeFirstLetter(entity) as any)) {
      const response = await getOneByOneParam(req, entity as Partial<Uncapitalize<Prisma.ModelName>>);
      if (response) {
        sendSuccess(res, 200, `User info for ID: ${req.params.id} successfully retreived`, { [entity]: response });
      }
    }
  } catch (error) {
    return next(error);
  }
};

export default getEntityById;