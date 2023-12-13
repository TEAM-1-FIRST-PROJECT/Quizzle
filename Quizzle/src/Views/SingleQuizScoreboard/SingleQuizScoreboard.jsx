import { useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const SingleQuizScoreBoard = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState();
    useEffect(() => {
      getQuizById(id)
        .then((fetchedQuiz) => {
          setQuiz(fetchedQuiz);
        })
        .catch((error) => {
          toast.error("Error fetching quiz details:", error);
          setQuiz(null);
        });
    }, [id]);
  
    return (
        <div className="h-screen pb-20 overflow-auto p-5">
          <div className="ml-20 text-4xl animate-fade-in font-bold dark:text-zinc-200 ">
            <p className="mt-10">Take a look at the results of all participants.</p>
          </div>
          {quiz && <div className="mt-20 justify-center items-center border-2 p-10 rounded-lg bg-gradient-to-br from-indigo-400 dark:from-zinc-600">
            <h1 className="mb-5 text-5xl dark:text-zinc-200">Quiz: {quiz.title}</h1>
            <table className="table-auto rounded w-full text-center text-white dark:text-zinc-200 dark:bg-gradient-to-br to-zinc-700">
              <thead className="text-lg ">
                <tr className="border ">
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Quiz Title</th>
                  <th className="px-4 py-2">Your score</th>
                  <th className="px-4 py-2">Max score</th>
                  <th className="px-4 py-2">Passing score</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(Object.values(quiz?.scoreBoard))
                  .sort((a, b) => b.score - a.score)
                  .map((user) => (
                    <tr key={user.username} className="border dark:bg-gradient-to-br dark:from-zinc-800">
                      <td className="px-4 py-2">{user.username}</td>
                      <td className="px-4 py-2">{quiz.title}</td>
                      <td className="px-4 py-2">{user.score}</td>
                      <td className="px-4 py-2">{quiz.maxPassingPoints}</td>
                      <td className="px-4 py-2">{quiz.minPassingPoints}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>}
        </div>
      );
}

export default SingleQuizScoreBoard;