import { get, set, ref, query, update, orderByChild, equalTo } from "firebase/database";
import { database } from "../config/firebase-config";

export const getUserByHandle = (handle) => {
  return get(ref(database, `users/${handle}`))
}

export const createUserHandle = (
  username,
  uid,
  email,
  firstName,
  lastName,
  role,
  phone,
  profileImgUrl,
  address
) => {
  return set(ref(database, `users/${username}`), {
    username,
    uid,
    email,
    firstName,
    lastName,
    profileImgUrl,
    role,
    phone,
    address,
    createdOn: new Date(),
    likedPosts: {},
    isBlocked: false,
  });
};

export const getUserData = (uid) => {
  return get(query(ref(database, "users"), orderByChild("uid"), equalTo(uid)));
};

export const checkUserPhone = (phone) => {
  return get(ref(database, `users`))
    .then(snapshot => {
      if (!snapshot.exists()) {
        return false
      }
      return Object.values(snapshot.val()).map(el => el.phone).includes(phone)
    });
}

export const updateUserData = (username, firstName, lastName, email, address, imgURL) => {
  const pathFirstName = `users/${username}/firstName`;
  const pathLastName = `users/${username}/lastName`;
  const pathEmail = `users/${username}/email`;
  const pathPhoto = `users/${username}/profileImgUrl`
  const pathAddress = `users/${username}/address`;
  return update(ref(database), {
    [pathFirstName]: firstName,
    [pathLastName]: lastName,
    [pathEmail]: email,
    [pathPhoto]: imgURL,
    [pathAddress]: address,
  });
};

export const updateUserScore = (username, quizId, title, score, category, userAnswers, maxPassingPoints, minPassingPoints) => {
  const updateUserScore = {};
  updateUserScore[`/users/${username}/score/${title}`] = { score, title, id: `${quizId}`, category, userAnswers, maxPassingPoints, minPassingPoints, resolvedOn: Date.now(), };
  updateUserScore[`/quizzes/${quizId}/scoreBoard/${username}`] = { username, score }

  return update(ref(database), updateUserScore);
};

export const getAllUsers = () => {
  return get(ref(database, 'users'))
}

export const addCommentInUserResults = (username, quiz, index, comment) => {
  const updateUserScore = {};
  updateUserScore[`/users/${username}/score/${quiz}/userAnswers/${index}/comment`] = comment

  return update(ref(database), updateUserScore);
}

export const getUserDataByEmail = (email) => {
  return get(query(ref(database, "users"), orderByChild("email"), equalTo(email)));
};
