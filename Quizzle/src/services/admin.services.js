import { get, ref, remove, update } from "firebase/database";
import { database } from "../config/firebase-config";

export const searchUser = (searchTerm) => {
  return get(ref(database, "users")).then((snapshot) => {
    if (!snapshot.exists()) {
      throw new Error(`User with searchTerm ${searchTerm} does not exist!`);
    }
    const users = snapshot.val();
    const filteredUsers = Object.keys(users)

      .filter(
        (key) =>
          (users[key]?.username && users[key].username.includes(searchTerm)) ||
          (users[key]?.email && users[key].email.includes(searchTerm)) ||
          (users[key]?.firstName && users[key].firstName.includes(searchTerm)) ||
          (users[key]?.lastName && users[key].lastName.includes(searchTerm))
      )
      .map((key) => users[key]);
    return filteredUsers;
  });
};

export const blockUser = (username, blockStatus) => {
  return update(ref(database, `users/${username}`), {
    isBlocked: blockStatus,
  });
};

export const deleteQuiz = (id) => {
    return remove(ref(database, `quizzes/${id}`));
  };
