import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "../../../utils/express/sendSuccess";
import { users } from "../../../datas/users";
import User from "../../../types/Users/User";
import UserQueries from "../../../types/Users/userQueries";
import UserQuery from "../../../types/Users/userQueries";
import fetchUsers from "../../../services/users/fetchUsers";
import { DatabaseError } from "../../../errors/DatabaseError";
import { PrismaClient } from '@prisma/client';

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
  try {
    const queries = req.query;
    console.log('Queries', queries);
    const arrayOfQuerries = Object.entries(queries);
    if (arrayOfQuerries.length === 1) {
      const users = await prisma.user.findFirst({
        where: {
          ...queries
        },
      });
      queryData = arrayOfQuerries.map(([key, val]) => {
        return `${key}=${val}`;
      });
      if (users) {
        sendSuccess(res, 200, `User info for query ${queryData} successfully retreived`.replace(',', '&'), { users });
      } else {
        throw new DatabaseError(`User controller error (getUsersByQuery: No user(s) match(es) with query string: ${queryData}`);
      }
    } else if ((arrayOfQuerries.length > 2)) {
      const usersForQuery = findUsersBy(req.query as UserQuery);
      const usersResponse = await fetchUsers(usersForQuery!);
      if (usersForQuery!.length) {
        const entries = Object.entries((req.query));
        const data: string[] = entries.map(([key, val]) => {
          return `${key}=${val}`;
        });
        sendSuccess(res, 200, `User info for query ${data} successfully retreived`.replace(',', '&'), { users: usersForQuery! });
      }
    } else {
      // del duplicates for query string,create query chain and del , char at begining of the whole string
      queryChain = [... new Set(queryChain.split('|'))].join('&').slice(1);
      throw new DatabaseError(`User controller error (getUsersByQuery: No user(s) match(es) with query string: ${queryChain}`);
    }
  } catch (error) {
    return next(error);
  }
};

export default getUsersByQueryString;