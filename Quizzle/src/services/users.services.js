import { get, set, ref, query, orderByChild, equalTo } from "firebase/database";
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
  profileImgUrl
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
      return Object.values(snapshot.val()).map(el => el.phone).includes(phone)
    });
}