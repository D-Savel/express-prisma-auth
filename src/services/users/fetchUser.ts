import User from "../../types/Users/User";

async function fetchUser(_user: User): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(_user);
    },
      1000
    );
  });
};

export default fetchUser;