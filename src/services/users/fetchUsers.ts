import User from "../../types/Users/User.js";

//Simulate asynchrone fetching data

async function fetchUsers(_users: User[]): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(_users);
    },
      1000
    );
  });
};

export default fetchUsers;