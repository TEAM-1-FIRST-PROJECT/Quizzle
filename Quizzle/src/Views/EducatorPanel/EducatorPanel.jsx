import { useState, useEffect, useContext } from "react";
import "firebase/database";
import { quizzesRef,  } from "../../services/quiz.services";
import { onValue } from "firebase/database";
import { Link } from "react-router-dom";
//import toast from "react-hot-toast";

import { AuthContext } from "../../context/authContext";

const EducatorPanel = () => {
  const [quizzes, setQuizzes] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState("");

  const {userData} = useContext(AuthContext);
const username = userData?.username;
  useEffect(() => {
    onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();

      const filteredQuizzes = Object.values(data).filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase())          
      );
      setQuizzes(filteredQuizzes);
    });
  }, [searchTerm]);

 

 

  

 

  return (
    <div className="m-20 justify-center items-center border-4 p-10 rounded-lg bg-gradient-to-bl from-indigo-400 to-cyan-400">
      <h1 className="mb-5 text-3xl text-white">Quiz Manage</h1>
      <input
        type="text"
        className="border p-2 rounded mb-5"
        placeholder="Search for quiz ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table-auto rounded w-full text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
        <thead className=" text-lg">
          <tr>
            <th className="border px-4 py-2">Create By</th>
            <th className="border px-4 py-2">Quiz Title</th>
            <th className="border px-4 py-2">Created On</th>
            <th className="border px-4 py-2">Edit</th>
            <th className="border px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            quiz.createdBy === username && (
            <tr key={quiz.id}>
              <td className="border px-4 py-2">{quiz.createdBy}</td>
              <td className="border px-4 py-2">{quiz.title}</td>
              <td className="border px-4 py-2">
                {new Date(quiz.createdOn).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
              <Link
            to={`/assign-quiz/${quiz?.id}`}
            className="inline-block mx-1 px-4 py-2 border border-indigo-500 rounded-lg text-center font-medium hover:bg-indigo-500 hover:text-white dark:hover:bg-dark-1 dark:hover:text-white-300"
          >
            Assign quiz
          </Link>
              </td>
              <td className="border px-4 py-2">
                
              </td>
              </tr>
              )
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default EducatorPanel;
