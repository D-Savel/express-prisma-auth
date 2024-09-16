import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../../utils/express/sendSuccess.js";
import { users } from "../../../datas/users.js";
import User from "../../../types/Users/User.js";
import UserQueries from "../../../types/Users/userQueries.js";
import UserQuery from "../../../types/Users/userQueries.js";
import fetchUsers from "../../../services/users/fetchUsers.js";
import { DatabaseError } from "../../../errors/DatabaseError.js";
import { PrismaClient } from '@prisma/client';
import { getOneByOneParam } from "../../../services/crud/dbRequest.js";
import isNull from "../../../utils/common/isNull.js";

const prisma = new PrismaClient();

let queryChain: string = '';


function findUsersBy(queries: UserQueries): User[] | undefined {
  queryChain = '';
  const arrayOfQuerries = Object.entries(queries);
  let findUser: User[];
  let filteredUsers: User[] = [];

  for (const query of arrayOfQuerries) {
    findUser = [];
    findUser = users.filter((user) => {
      const userValueForKey = user[query[0]];
      const queryValueForKey = query[1];
      queryChain = `${queryChain}|${query[0]!}=${query[1]}`;
      return userValueForKey!.localeCompare(queryValueForKey!) === 0;
    });
    if (findUser.length) {
      //Use Set method to Remove Duplicates
      filteredUsers = [... new Set([...filteredUsers, ...findUser])];
    }
  }
  return filteredUsers;
}

let queryData: string[];

const getUsersByQueryString = async (req: Request, res: Response, next: NextFunction) => {
  const arrayOfQuerries = Object.entries(req.query);
  const queries = req.query;
  console.log('Array of Queries', arrayOfQuerries);
  queryData = arrayOfQuerries.map(([key, val]) => {
    return `${key}=${val}`;
  });
  try {
    // request for one param
    if (arrayOfQuerries.length === 1) {
      const users = [await getOneByOneParam(req, 'user')];
      console.log('Users in getByOneParam', users);
      if (users && !isNull(users)) {
        sendSuccess(res, 200, `User info for query ${queryData} successfully retreived`.replace(',', '&'), users);
      } else {
        throw new DatabaseError(`User controller error (getUsersByQuery: No user(s) match(es) with query string: ${queryData}`);
      }
    }
    if ((arrayOfQuerries.length > 1)) {
      const usersForQuery = findUsersBy(req.query as UserQuery);
      const usersResponse = await fetchUsers(usersForQuery!);
      if (usersForQuery!.length) {
        const entries = Object.entries((req.query));
        const data: string[] = entries.map(([key, val]) => {
          return `${key}=${val}`;
        });
        sendSuccess(res, 200, `User info for query ${data} successfully retreived`.replace(',', '&'), { users: usersForQuery! });
      }
    }
  } catch (error) {
    return next(error);
  }
};

export default getUsersByQueryString;