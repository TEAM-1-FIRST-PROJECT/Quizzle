import { onValue } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { getGroupDetails, groupsRef, updateGroupMembers } from "../../../services/educatorGroups.services";
import { AuthContext } from "../../../context/authContext";
import toast from "react-hot-toast";
import joinGroup from "../../../assets/joinGroup.gif";

const JoinGroup = () => {
  const [groupName, setGroupName] = useState("");
  const { userData, user } = useContext(AuthContext);
  const [groupId, setGroupId] = useState("");

  const username = userData?.username;
  const id = user?.uid;

  useEffect(() => {
    onValue(groupsRef, (snapshot) => {
      if (snapshot.exists()) {
        const result = Object.keys(snapshot.val())[0];
        setGroupId(result);
      }
    });
  }, [username]);

  const handleJoinGroup = () => {
    if (groupName.trim() !== "") {
      getGroupDetails(groupName).then((snapshot) => {
        if (snapshot.exists()) {
          const existingMembers = snapshot.val().members || {};

          const updatedMembers = {
            ...existingMembers,
            [id]: {
                userName: username,
                joinedAt: Date.now(),
            },
          };

          updateGroupMembers(groupId, updatedMembers).then(() => {
            toast.success("Group joined successfully");
          });
        } else {
          toast.error("Group does not exist");
        }
      });
    }
    setGroupName("");
  };

  return (
    <div className="">
      <img className="h-full ml-3 w-[370px] mix-blend-multiply" src={joinGroup} alt="group" />

      <h1 className="mb-4 mt-16 text-2xl text-white dark:text-zinc-200">Join Group</h1>
      <input
        type="text"
        className="w-full p-2 mb-2  bg-white dark:bg-zinc-400 dark:text-zinc-800 dark:placeholder-zinc-700 rounded-md shadow-md"
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button
        className="w-full p-2 mt-2 text-white bg-violet-500 dark:bg-violet-600 dark:hover:bg-violet-500 dark:text-zinc-200 rounded-md shadow-md transform hover:scale-105 transition-transform hover:duration-1000 hover:bg-violet-400"
        onClick={handleJoinGroup}
      >
        Join Group
      </button>
    </div>
  );
};

export default JoinGroup;
