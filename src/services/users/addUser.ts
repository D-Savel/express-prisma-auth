import { users } from "../../datas/users.js";
import User from "../../types/Users/User.js";

// add user to users without update data in "../../datas/users" to simulate create request

async function addUser(_newUser: User): Promise<User> {
  try {
    users.push(_newUser);
  } catch (error) {
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(_newUser);
    },
      1500
    );
  });
};

export default addUser;