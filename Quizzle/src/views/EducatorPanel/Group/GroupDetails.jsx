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

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
      },
    },
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div className="mt-[70px] p-10 ml-[240px] bg-black min-h-screen items-center">
      <motion.h1
        className="mb-4 text-4xl text-center font-bold mt-10 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Group Details
      </motion.h1>
      {group && (
        <motion.div
          className="flex flex-col items-center space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="p-4 border-4 border-blue-300 rounded-md w-80 shadow-2xl transform transition-transform "
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={childVariants}
          >
            <p className="text-white">
              Group name{" "}
              <h2 className="text-2xl font-bold mb-4">{group.name}</h2>
            </p>
            <p className="text-center mb-5 text-white">
              Formed by <p className="font-bold text-lg text-white">{group.createdBy}</p>
            </p>

            <p className=" text-xl mb-3 text-center text-white">
              Created on: {new Date(group.createdOn).toLocaleDateString()}
            </p>
            {isEditingDescription ? (
              <textarea
                className="w-full p-2 mb-4 rounded-md shadow-inner text-white"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            ) : (
              <p className="mb-4 text-xl text-center text-white">
                Description <p>{group.description}</p>
              </p>
            )}
            <motion.button
              className="w-full p-2 text-white bg-blue-500 rounded-md shadow-lg"
              onClick={
                isEditingDescription
                  ? handleSaveDescription
                  : handleEditDescription
              }
              variants={buttonVariants}
              whileHover="hover"
            >
              {isEditingDescription ? "Save Description" : "Edit Description"}
            </motion.button>
          </motion.div>
          <p className="text-2xl text-white font-bold">Members:</p>
          <motion.div
            className="p-4 border-4 border-blue-300 rounded-md w-80 text-white shadow-2xl transform transition-transform "
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={childVariants}
          >
            <div className="flex flex-col space-y-4">
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
                    {member.userName} <p></p>Member since:{" "}
                    {new Date(member.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
      <Link to="/group-quizzes">
        <motion.button
          className="mt-5 ml-[650px] py-3 px-3 text-white bg-blue-500 rounded-md shadow-lg mx-auto"
          variants={buttonVariants}
          whileHover="hover"
        >
          View Group Quizzes
        </motion.button>
      </Link>
    </motion.div>
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
