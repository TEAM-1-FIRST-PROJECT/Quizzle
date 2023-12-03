import { useState, useEffect } from "react";
import "firebase/database";
import { quizzesRef, } from "../../services/quiz.services";
import { onValue } from "firebase/database";
import { dateFormat } from "../../common/helpers";
import { dateNow } from "../../common/constants";
import { Link } from "react-router-dom";
//import toast from "react-hot-toast";

const EducatorPanel = () => {

  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [finishedQuizzes, setFinishedQuizzes] = useState(true);

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

  const finalDate = (ob) => {
    const finalDate = Object.values(ob).map(arr => arr[1]);
    return Math.max(...finalDate);
  }

  const openQuizzes = finishedQuizzes
    ? quizzes.filter(quiz => quiz.assignedUsers === undefined || finalDate(quiz.assignedUsers) > dateNow)
    : quizzes.filter(quiz => quiz.scoreBoard !== undefined)

  return (
    <div className="h-screen bg-white pb-20 overflow-auto p-5">
      <div className="animate-gradient-x text-start ml-20 text-4xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 to-stone-400 ">
      <p className="mt-10 ">On this page, you can view all the quizzes.</p>
      <p className="mt-5 ">You have the option to search for a quiz using the search field,</p>
        <p className="mt-5 "> and you can assign a specific quiz to a particular student.</p>
        </div>
      <div className="mt-20 justify-center items-center border-4 p-10 rounded-lg bg-gradient-to-bl from-indigo-400 to-cyan-400">
        <h1 className="mb-5 text-5xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 to-stone-100">Quizzes</h1>
        <input
          type="text"
          className="border p-2 rounded mb-5"
          placeholder="Search for quiz ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-cyan-400 rounded-md hover:bg-green-400 float-right transform transition duration-500 ease-in-out hover:scale-105"
          onClick={() => { setFinishedQuizzes((!finishedQuizzes)) }}>{finishedQuizzes ? 'switch to finished quizzes' : 'switch to opened quizzes'}</button>
        <table className="table-auto rounded w-full text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
          <thead className=" text-lg">
            <tr>
              <th className="border px-4 py-2">Quiz Title</th>
              <th className="border px-4 py-2">Created On</th>
              {finishedQuizzes
                ? <th className="border px-4 py-2">Assigned students </th>
                : <th className="border px-4 py-2">Students result</th>}
              <th className="border px-4 py-2">Assign</th>
            </tr>
          </thead>
          <tbody>
            {openQuizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td className=" border px-4 py-2">{quiz.title}</td>
                <td className="border-2 px-4 py-2">
                  {dateFormat(quiz.createdOn)}
                </td>
                <td className="border px-4 py-2">
                  <Link to={`/quiz-scoreboard/${quiz?.id}`}>
                    {finishedQuizzes
                      ? (quiz.assignedUsers ? Object.keys(quiz.assignedUsers).length : 0)
                      : (quiz.scoreBoard ? Object.keys(quiz.scoreBoard).length : 0)}</Link>
                </td>
                <td className="border px-4 py-2">
                  <a href={`/assign-quiz/${quiz?.id}`}
                    className=" px-4 py-1 border border-indigo-500 rounded-lg text-center font-medium hover:bg-indigo-500 hover:text-white dark:hover:bg-dark-1 dark:hover:text-white-300"
                    onClick={() => { history.push(`/assign-quiz/${quiz?.id}`) }}>Assign</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EducatorPanel;