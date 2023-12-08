import { get, ref, remove, set, update } from "firebase/database";
import { database } from "../config/firebase-config";

export const createGroup = (
  groupName,
  groupDescription,
  members,
  creatorName,
  organizationName
) => {
  return set(ref(database, `groups/${groupName}`), {
    name: groupName,
    organization: organizationName,
    description: groupDescription,
    members,
    createdBy: creatorName,
    createdOn: Date.now(),
  });
};

export const groupsRef = ref(database, "groups");



export const getGroupDetails = (groupId) => {
  return get(ref(database, `groups/${groupId}`));
};


export const updateGroupDescription = (groupId, newDescription) => {
   return update(ref(database, `groups/${groupId}`), { description: newDescription })
}
    
export const updateGroupMembers = (groupId, newMembers) => { 
  const pathMembers = `groups/${groupId}/members`
  return update(ref(database), {
   [pathMembers]: newMembers
  })
}

export const removeEducator = (groupId, memberId) => {
  return remove(ref(database, `groups/${groupId}/members/${memberId}`));
};
