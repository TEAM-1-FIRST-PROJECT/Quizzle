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
          <div className="ml-20 text-4xl animate-fade-in font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-zinc-500">
            <p className="mt-10">Take a look at the results of all participants.</p>
          </div>
          {quiz && <div className="mt-20 justify-center items-center border-4 p-10 rounded-lg bg-gradient-to-bl from-indigo-400">
            <h1 className="mb-5 text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-stone-100">Quiz: {quiz.title}</h1>
            <table className="table-auto rounded w-full text-center text-white">
              <thead className="text-lg bg-indigo-400">
                <tr className="border border-violet-200 ">
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
                    <tr key={user.username} className="border bg-indigo-300 ">
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