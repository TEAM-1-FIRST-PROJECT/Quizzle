import { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/authContext";
import { createGroup } from "../../../services/educatorGroups.services";
import Group from '../../../assets/createGroup.gif';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupMembers, setGroupMembers] = useState({});
  const [creatorName, setCreatorName] = useState("");
  const { userData, user } = useContext(AuthContext);
  const [organizationName, setOrganizationName] = useState("");

  const username = userData?.username;
  const id = user?.uid;

  useEffect(() => {
    setCreatorName(username);
    setGroupMembers({
      [id]: {
        userName: creatorName,
        joinedAt: Date.now(),
      },
    });
  }, [username, id, creatorName]);

  const handleCreateGroup = () => {
    if (groupName.trim() !== "") {
      createGroup(groupName, groupDescription, groupMembers, creatorName, organizationName)
        .then(() => {
          toast.success("Group created successfully");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong");
        });
    }
    setGroupName("");
    setGroupDescription("");
  };

  return (
    <div className="">
      <img className="h-full w-[350px] mix-blend-multiply" src={Group} alt="group" />
      <h1 className="mb-4 text-2xl text-white dark:text-zinc-200">Create Group</h1>
      <input
        type="text"
        className="w-full p-2 mb-2 bg-white dark:bg-zinc-400 dark:text-zinc-800 dark:placeholder-zinc-700 rounded-md shadow-md"
        placeholder='Enter group name'
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        />
      <input
        type="text"
        className="w-full p-2 mb-2 bg-white dark:bg-zinc-400 dark:text-zinc-800 dark:placeholder-zinc-700 rounded-md shadow-md"
        placeholder="Enter organization name"
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
      />

      <textarea
        className="w-full p-2 mt-2 bg-white dark:bg-zinc-400 dark:text-zinc-800 dark:placeholder-zinc-700 rounded-md shadow-md"
        placeholder="Enter group description"
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
      />
      <button
        className="w-full p-2 mt-2 text-white bg-violet-500 dark:bg-violet-600 dark:hover:bg-violet-500 dark:text-zinc-200 rounded-md shadow-md transform hover:scale-105 transition-transform hover:duration-1000 hover:bg-violet-400"
        onClick={handleCreateGroup}
      >
        Create Group
      </button>
    </div>
  );
};

export default CreateGroup;
