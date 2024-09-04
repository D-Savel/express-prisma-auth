import { Request } from "express";
import { Prisma, PrismaClient, User } from '@prisma/client';
import capitalizedUsername from "../../utils/user/capitalizedUsername";

const prisma = new PrismaClient();

const create = async (req: Request, entity: Uncapitalize<Prisma.ModelName>): Promise<User | undefined> => {
  try {
    let { payload } = req.body;
    payload = { ...payload, username: capitalizedUsername(payload.username) };
    const data = await prisma[entity].create({
      data: payload
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateById = async (req: Request, entity: Uncapitalize<Prisma.ModelName>): Promise<User | undefined> => {
  try {
    let { payload } = req.body;
    payload = { ...payload, username: capitalizedUsername(payload.username) };
    const data = await prisma[entity].update({
      where: { id: req.params.id }
      ,
      data: payload
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};


const delById = async (req: Request, entity: Uncapitalize<Prisma.ModelName>): Promise<User | undefined> => {
  try {

    const deletedData = await prisma[entity].delete({
      where: {
        id: req.params.id,
      },
    });
    return deletedData;
  } catch (error) {
    console.log(error);
  }
};

const getByOneParam = async (req: Request, entity: Uncapitalize<Prisma.ModelName>): Promise<User | null | undefined> => {
  try {
    // get param in path if id param
    let param: any = req.params;
    // if no id in path get param in query
    if (Object.keys(param).length === 0) {
      param = req.query;
    }
    // if no param in query default param is email in body payload
    if (Object.keys(param).length === 0) {
      param = { email: req.body.payload.email };
    }
    // Throw error for bad param (No param or more than one param)
    if (Object.keys(param).length > 1) {
      throw new Error('More than one param for request function => getByoneParam');
    }
    if (Object.keys(param).length === 0) {
      throw new Error('no param for request function => getByoneParam');
    }
    const data = await prisma[entity].findUnique({
      where: param
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { create, delById, getByOneParam, updateById };