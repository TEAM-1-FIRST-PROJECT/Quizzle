import { useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const QuizScoreboard = () => {

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
  quiz?.scoreBoard ? console.log(Object.values(quiz?.scoreBoard)) : 'kkklk'
  console.log(quiz?.scoreBoard.pep22)

  return (
    <>
      {quiz && <div className="m-20 justify-center items-center border-4 p-10 rounded-lg bg-gradient-to-bl from-indigo-400 to-cyan-400">
        <h1 className="mb-5 text-3xl text-white">Quiz {quiz.title}</h1>

        <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-cyan-400 rounded-md hover:bg-green-400 float-right transform transition duration-500 ease-in-out hover:scale-105"
          onClick={() => { }}></button>
        <table className="table-auto rounded w-full text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
          <thead className=" text-lg">
            <tr>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Quiz Title</th>
              <th className="border px-4 py-2">Score</th>
              <th className="border px-4 py-2">Max score</th>
              <th className="border px-4 py-2">View Answers</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(quiz?.scoreBoard).map((user) => (
              <tr key={quiz.id}>

                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{quiz.title}</td>
                <td className="border px-4 py-2">{user.score}</td>
                <td className="border px-4 py-2">100</td>
                <td className="border px-4 py-2">
                  <Link to={`/quiz-scoreboard/${quiz?.id}`}>
                    View Answers</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </>
  )
}

export default QuizScoreboard
