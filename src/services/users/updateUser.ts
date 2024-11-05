import { users } from "../../datas/users.js";
import User from "../../types/Users/User.js";
import { Request } from "express";

// add user to users without update data in "../../datas/users" to simulate create request
function updateUser(req: Request, _id: string, newUser: User): User {
  try {
    users.map((user) => {
      if (user.id === _id) {
        req.body.username ? user.username = req.body.username : null;
        req.body.email ? user.email = req.body.email : null;
        req.body.password ? user.password = req.body.password : null;
      }
      return user;
    });
  } catch (error) {
  }
  return (newUser);
};

export default updateUser;
