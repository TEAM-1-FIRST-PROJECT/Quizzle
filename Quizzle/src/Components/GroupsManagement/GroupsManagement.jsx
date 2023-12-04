
import { useEffect, useState } from "react";
import CreateGroup from "./CreateGroup/CreateGroup";
import JoinGroup from "./JoinGroup/JoinGroup";

const GroupsManagement = () => {
  const [index, setIndex] = useState(0);
  const text = 'Create or Join a Group';

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, 90); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center">
      <p className="font-extrabold animate-fade-in text-6xl mt-10 bg-clip-text p-1 text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
        {text.slice(0, index).split('').map((char, i) => (
          <span key={i} className="animate-gradient">{char}</span>
        ))}
      </p>
    <div className="flex flex-wrap ml-32 m-10 space-x-60 pb-12">
      <div className="w-1/3 m-4 bg-gradient-to-bl from-indigo-400 shadow-lg rounded-lg p-10 text-black">
        <CreateGroup />
      </div>
      <div className="w-1/3 m-4 bg-gradient-to-br from-indigo-400 shadow-lg rounded-lg p-10 text-black">
        <JoinGroup />
      </div>
      </div>
      </div>
  );
};

export default GroupsManagement;
