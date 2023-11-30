
import { useEffect, useState } from "react";
import CreateGroup from "./CreateGroup/CreateGroup";
import JoinGroup from "./JoinGroup/JoinGroup";

const GroupsManagement = () => {
  const [index, setIndex] = useState(0);
  const text = 'CREATE or JOIN GROUP';

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 100); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen bg-hero-pattern-2 bg-cover flex flex-col items-center">
    <div className="flex flex-wrap justify-between p-20 m-14 opacity-80">
      <div className="w-1/3 m-4 hero-pattern-2 bg-gradient-to-l from-indigo-400 to-cyan-400 shadow-md rounded-lg p-10 text-black">
        <CreateGroup />
      </div>
      <p className="text-black font-extrabold text-2xl">
        {text.slice(0, index).split('').map((char, i) => (
          <span key={i} className="animate-gradient">{char}</span>
        ))}
      </p>
      <div className="w-1/3 m-4 bg-gradient-to-r from-indigo-400 to-cyan-400 shadow-md rounded-lg p-10 text-black">
        <JoinGroup />
      </div>
      </div>
      </div>
  );
};

export default GroupsManagement;
