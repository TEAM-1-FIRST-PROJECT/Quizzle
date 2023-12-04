import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { groupsRef } from "../../../services/educatorGroups.services";
import { onValue } from "firebase/database";

const GroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [index, setIndex] = useState(0);
  const text = `Groups List `;

 

  useEffect(() => {
  
    onValue(groupsRef, (snapshot) => {
      if (snapshot.exists()) {
        const groupsArray = Object.entries(snapshot.val()).map(
          ([id, group]) => ({
            id,
            ...group,
          })
        );
        setGroups(groupsArray);
      } else {
        setGroups([]);
      }
    });

    const timer = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 70);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="text-center mt-10 mb-5 mr-20">
      {text
          .slice(0, index)
          .split("")
          .map((char, i) => (
            <span key={i} className="animate-gradient bg-clip-text text-5xl font-bold text-transparent bg-gradient-to-r from-indigo-300 to-violet-400">
              {char}
            </span>
          ))}
        </div>
      <div className="justify-center p-6">
      <div className="flex flex-col text-center ml-96 space-y-7 w-1/3 ">
        {groups.map((group, index) => (
          <div style={{ animation: `slideInFromRight 0.5s ${index * 0.1}s both` }} key={group.id} className="p-4 border-2  rounded-md w-full text-white hover:shadow-2xl hover:shadow-stone-300 bg-gradient-to-br from-indigo-400 to-sky-300 transition-all duration-500 ease-in-out transform hover:scale-105">
            <Link to={`/group/${group.id}`} className="no-underline text-white">
              Name
              <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
              Organization
              {group.organization && <p className="text-white text-xl font-bold">{group.organization}</p>}
            </Link>
          </div>
        ))}
      </div>
      </div>
      </div>
  );
};

export default GroupsList;
