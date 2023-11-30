import { useState, useEffect } from "react";
import "firebase/database";
import { quizzesRef, } from "../../services/quiz.services";
import { onValue } from "firebase/database";
import { Link } from "react-router-dom";
import { dateFormat } from "../../common/helpers";
import { dateNow } from "../../common/constants";
//import toast from "react-hot-toast";

const EducatorPanel = () => {

  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ongoing, setOngiong] = useState(true);
  //const [assignedUsers, setAssignedUsers]= useState(0)

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
  const f = (ob) => {
    let finalDate = Object.values(ob).map(arr => arr[1]);
    return Math.max(...finalDate);
  }
  //quizzes[3]?.assignedUsers ? console.log(f(quizzes[3].assignedUsers)) : console.log('open')
  // const openQuizzes = quizzes.filter(quiz => quiz.assignedUsers === undefined || f(quiz.assignedUsers) > dateNow);
  //const openQuizzes = quizzes.filter(quiz => quiz.assignedUsers !== undefined && f(quiz.assignedUsers) < dateNow)
  const openQuizzes = ongoing
    ? quizzes.filter(quiz => quiz.assignedUsers === undefined || f(quiz.assignedUsers) > dateNow)
    : quizzes.filter(quiz => quiz.assignedUsers !== undefined && f(quiz.assignedUsers) < dateNow)
  //console.log(openQuizzes)
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
      <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-cyan-400 rounded-md hover:bg-green-400 float-right transform transition duration-500 ease-in-out hover:scale-105"
        onClick={() => { }}>Switch to</button>
      <table className="table-auto rounded w-full text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
        <thead className=" text-lg">
          <tr>
            <th className="border px-4 py-2">Create By</th>
            <th className="border px-4 py-2">Quiz Title</th>
            <th className="border px-4 py-2">Created On</th>
            <th className="border px-4 py-2">Assigned students </th>
            <th className="border px-4 py-2">Assign</th>
          </tr>
        </thead>
        <tbody>
          {openQuizzes.map((quiz) => (
            <tr key={quiz.id}>

              <td className="border px-4 py-2">{quiz.createdBy}</td>
              <td className="border px-4 py-2">{quiz.title}</td>
              <td className="border px-4 py-2">
                {dateFormat(quiz.createdOn)}
              </td>
              <td className="border px-4 py-2">
                {quiz.assignedUsers ? Object.keys(quiz.assignedUsers).length : 0}
                {/* <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-cyan-400 rounded-md hover:bg-green-400 float-right transform transition duration-500 ease-in-out hover:scale-105"
                  onClick={() => { console.log(quiz.id) }}>Switch to</button> */}
              </td>
              <td className="border px-4 py-2">
                <Link
                  to={`/assign-quiz/${quiz?.id}`}
                  className=" px-4 py-1 border border-indigo-500 rounded-lg text-center font-medium hover:bg-indigo-500 hover:text-white dark:hover:bg-dark-1 dark:hover:text-white-300"
                >
                  Choose a students
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default EducatorPanel;
