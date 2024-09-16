import { users } from "../../datas/users.js";
import User from "../../types/Users/User.js";

function findUserById(_id: string): User | undefined {
  const user = users.find((item) => {
    return item.id == _id;
  });
  return user;
};

export default findUserById;