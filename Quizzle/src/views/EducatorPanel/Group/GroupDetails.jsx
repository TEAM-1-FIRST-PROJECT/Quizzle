import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserByHandle } from "../../../services/users.services";
import {
  getGroupDetails,
  updateGroupDescription,
} from "../../../services/educatorGroups.services";
import { motion } from "framer-motion";

const GroupsDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [groupCreator, setGroupCreator] = useState("");

  useEffect(() => {
    getGroupDetails(groupId)
      .then((snapshot) => {
        const group = snapshot.val();
        if (snapshot.exists()) {
          setGroup(group);
          setNewDescription(group.description || "");
          renderMembers(group.members);
          setGroupCreator(group.createdBy);
        } else {
          console.error("Group not found");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    const renderMembers = (members) => {
      Promise.all(
        Object.values(members).map((member) => {
          return getUserByHandle(member.userName).then((snapshot) => {
            const user = snapshot.val();
            return {
              ...member,
              avatar: user ? user.profileImgUrl : null,
            };
          });
        })
      ).then((membersArray) => {
        setMembers(membersArray);
      });
    };
  }, [groupId]);

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveDescription = () => {
    updateGroupDescription(groupId, newDescription).then(() => {
      setIsEditingDescription(false);
      toast.success("Description updated successfully");
    });
  };

  return (
    <div className="">
      <div className="flex flex-col h-screen items-center ">
        <h1 className="mb-4 text-4xl text-center font-bold mt-10 rounded-full bg-gradient-to-r from-indigo-300 dark:text-zinc-300">
          Group Details
        </h1>
        {group && (
          <div className="flex flex-col items-center rounded-xl space-y-4 bg-gradient-to-bl from-indigo-400 dark:bg-gradient-to-tl dark:from-zinc-600">
            <div className="p-4 rounded-xl w-80 shadow-2xl transform transition-transform bg-gradient-to-br from-indigo-400">
              <p className="text-black">
                Group name{" "}
                <h2 className="text-2xl font-bold mb-4 text-white dark:text-zinc-300">
                  {group.name}
                </h2>
              </p>
              <p className="text-center mb-5 text-black">
                Formed by{" "}
                <p className="font-bold text-lg text-white dark:text-zinc-300">
                  {group.createdBy}
                </p>
              </p>

              <p className=" text-xl mb-3 text-center text-black">
                Created on {" "}
                <span className=" text-yellow-200 dark:text-zinc-300">
                  {new Date(group.createdOn).toLocaleDateString()}
                </span>
              </p>
              {isEditingDescription ? (
                <textarea
                  className="w-full p-2 mb-4 rounded-md shadow-inner text-black dark:bg-zinc-400"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              ) : (
                <p className="mb-4 text-xl text-center text-black">
                  Description <p className="text-white dark:text-zinc-300">{group.description}</p>
                </p>
              )}
              
              <button
                className=" p-2 w-full text-white dark:text-zinc-300 bg-blue-500 dark:bg-indigo-600 border rounded-md hover:shadow-xl transform transition duration-500 ease-in-out hover:scale-105"
                onClick={
                  isEditingDescription
                    ? handleSaveDescription
                    : handleEditDescription
                }
              >
                {isEditingDescription ? "Save Description" : "Edit Description"}
              </button>
              
                <div className="flex justify-center mt-10">
                  <Link to="/group-quizzes">
                    <button className=" p-2 text-white dark:text-zinc-300 bg-blue-500 dark:bg-indigo-600 border rounded-md hover:shadow-xl transform transition duration-500 ease-in-out hover:scale-105">
                      View Group Quizzes
                    </button>
                  </Link>
                </div>
              <p className="text-2xl mt-2 text-white dark:text-black">Members</p>

              <div className="flex flex-col space-y-4 dark:text-zinc-300">
                {members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center space-x-2"
                  >
                    <img
                      className="w-8 h-8 rounded-full shadow-lg"
                      src={member.avatar}
                      alt="avatar"
                    />
                    <p className="font-bold">
                      {member.userName} <br />
                      <span className="dark:text-black">Member Since {" "}</span>
                      {new Date(member.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupsDetails;

/* {currentUser === groupCreator ? (
                      <button
                        onClick={() => handleRemoveMember()}
                        className="ml-1 rounded py-1 px-1 mb-2 text-white bg-black"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRemoveMember()}
                        className="ml-1 rounded py-1 px-1 mb-2 text-white bg-black"
                      >
                        Leave group
                      </button>
                    )} */
