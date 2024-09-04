import { users } from "../../datas/users";
import User from "../../types/Users/User";
import { Request } from "express";

// add user to users without update data in "../../datas/users" to simulate create request
function updateUser(_req: Request, _id: String, newUser: User): User {
  try {
    users.map((user) => {
      if (user.id === _id) {
        _req.body.username ? user.username = _req.body.username : null;
        _req.body.email ? user.email = _req.body.email : null;
        _req.body.password ? user.password = _req.body.password : null;
      }
      return user;
    });
  } catch (error) {
  }
  return (newUser);
};

export default updateUser;
