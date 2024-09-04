import { users } from "../../datas/users";
import User from "../../types/Users/User";

function findUserById(_id: string): User | undefined {
  const user = users.find((item) => {
    return item.id == _id;
  });
  return user;
};

export default findUserById;