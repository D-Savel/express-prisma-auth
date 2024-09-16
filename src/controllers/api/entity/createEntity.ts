import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../../../utils/express/sendSuccess.js";
import { create } from "../../../services/crud/dbRequest.js";
import capitalizeFirstLetter from "../../../utils/common/capitalizeFirstLetter.js";
import extractEntityFromRequest from "../../../utils/common/extractEntityfromRequest.js";

const createEntity = async (req: Request, res: Response, next: NextFunction) => {
  const entity = extractEntityFromRequest(req)!;

  try {
    let { payload } = req.body;
    const response = await create(req, entity);
    sendSuccess(res, 201, `${entity} ${capitalizeFirstLetter(payload.username)} successfully created`, { [entity]: response });
  } catch (error) {
    console.log(error);
  }
};

export default createEntity;