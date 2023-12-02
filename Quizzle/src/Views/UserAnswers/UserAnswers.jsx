import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import toast from "react-hot-toast";
import { getUserByHandle } from "../../services/users.services";


const UserAnswers = () => {

  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [user, setUser] = useState(null);
  const [quizId, username] = id.split('--')

  useEffect(() => {
    getQuizById(quizId)
      .then((fetchedQuiz) => {
        setQuiz(fetchedQuiz);
      })
      .catch((error) => {
        toast.error("Error fetching quiz details:", error);
        setQuiz(null);
      });

    getUserByHandle(username)
      .then((user) => {
        setUser(user.val());
      })
      .catch((error) => {
        toast.error("Error fetching quiz details:", error);
        setUser(null);
      });
  }, [quizId, username]);
  console.log(quiz, user)
  return (
    <>
      {quiz && <div className="h-screen bg-hero-pattern-2 bg-cover flex items-center justify-center">
        <button className="max-w-40rem mx-auto my-8 p-8 pt-10 bg-indigo-100 text-gray-800 rounded-lg shadow-md animate-slide-in-from-bottom">
          <p className="text-lg">{quiz?.title}</p>
          <p className="text-lg">{quiz.category}</p>
          {quiz.question.map((quest, i) => (
            <div key={i}>
              <div className="border border-solid border-indigo-300 p-4">
                <p className="block text-lg">{quest.question}</p>
                <p className="block text-left">correct answer:{quest.answers.find(item => item.isCorrect === true)
                  ? quest.answers.find(item => item.isCorrect === true).text
                  : null}</p>
                <p className="block text-left">your answer:    {user?.score[quiz?.title].userAnswers[i].text}</p>
              </div>
            </div>
          ))}
        </button>
      </div>}
    </>
  )
}

export default UserAnswers
