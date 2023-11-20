import { get, set, ref, orderByChild, equalTo } from "firebase/database";
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
    profileImgUrl
  ) => {
    return set(ref(database, `users/${username}`), {
      username,
      uid,
      email,
      firstName,
      lastName,
      profileImgUrl,
      isAdmin: false,
      isOrganizer: false,
      createdOn: new Date(),
      likedPosts: {},
      isBlocked: false,
    });
  };

export const getUserData = (uid) => {
    return get(ref(database, 'users'), orderByChild('uid'), equalTo(uid));
}