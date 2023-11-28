import { ref, set } from "firebase/database";
import { database } from "../config/firebase-config";

export const createGroups = (groupName, username, uid) => {
    return set(ref(database, `groups/${groupName}`), {
      username,
      uid,
     
     
     
    });
  };