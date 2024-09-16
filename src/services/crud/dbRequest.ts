import { Request } from "express";
import { Prisma, PrismaClient } from '@prisma/client';
import capitalizeFirstLetter from "../../utils/common/capitalizeFirstLetter.js";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();


const create = async (req: Request, entity: Uncapitalize<Prisma.ModelName>): Promise<typeof entity | null | undefined> => {
  try {
    const randomId = randomUUID();
    let { payload } = req.body;
    payload = { ...payload, username: capitalizeFirstLetter(payload.username), id: !payload.id ? randomId : payload.id };
    const data = await prisma[entity].create({
      data: payload
    });
    return data as unknown as typeof entity;
  } catch (error) {
    console.log(error);
  }
};

const updateById = async (req: Request, entity: Uncapitalize<Prisma.ModelName>): Promise<typeof entity | null | undefined> => {
  try {
    let { payload } = req.body;
    payload = { ...payload, username: capitalizeFirstLetter(payload.username) };
    const data = await prisma[entity].update({
      where: { id: req.params.id }
      ,
      data: payload
    });
    return data as unknown as typeof entity;
  } catch (error) {
    console.log(error);
  }
};


const delById = async (req: Request, entity: Uncapitalize<Prisma.ModelName>): Promise<typeof entity | null | undefined> => {
  try {

    const deletedData = await prisma[entity].delete({
      where: {
        id: req.params.id,
      },
    });
    return deletedData as unknown as typeof entity;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (req: Request, entity: Uncapitalize<Prisma.ModelName>): Promise<typeof entity | null | undefined> => {
  return entity;
};

const getOneByOneParam = async (req: Request, entity: Partial<Uncapitalize<Prisma.ModelName>>): Promise<typeof entity | null | undefined> => {
  //define unique attribut in db for entities {[entity]: unique attribut: string}
  interface UniqueAttributs {
    [k: string]: string;
  }

  const uniqueAtributs: UniqueAttributs[] = [{ User: 'email' }];

  try {
    // get param in path if id param
    let param: any = req.params;
    console.log('Param', param);
    // if no id in path get param in query
    if (Object.keys(param).length === 0) {
      param = req.query;
    }
    // if method POST (create) param is set to unique attribut value in payload for checking duplicate
    console.log('Method', req.method);
    if (req.method === 'POST' || req.method === 'PUT') {
      console.log('in req method', entity);
      const obj = uniqueAtributs.find(el => Object.keys(el).toString() === entity);
      console.log('in req method OBJ', obj);
      if (obj) {
        console.log('Object', obj);
        console.log('Param key', obj![entity]);
        param = { [obj![entity]]: req.body.payload[obj![entity]] };
        console.log('param in POST PUT req', param);
      }
    }
    // Throw error for bad param (No param or more than one param)
    if (Object.keys(param).length > 1) {
      throw new Error('More than one param for request function => getByoneParam');
    }
    if (Object.keys(param).length === 0) {
      throw new Error('no param for request function => getOneByOneParam');
    }
    console.log('Param', param);
    const data = await prisma[entity].findFirst({
      where: param
    });
    return data as unknown as typeof entity;
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req: Request, entity: Partial<Uncapitalize<Prisma.ModelName>>): Promise<typeof entity | null | undefined> => {

  try {
    // get param in path if id param
    let param: any = req.params;

    console.log('Param', param);
    const data = await prisma[entity].findFirst({
      where: param
    });
    return data as unknown as typeof entity;
  } catch (error) {
    console.log(error);
  }
};

export { create, delById, getOneByOneParam, updateById, getById };