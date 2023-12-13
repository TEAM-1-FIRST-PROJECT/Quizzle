import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import toast from "react-hot-toast";
import { addCommentInUserResults, getUserByHandle } from "../../services/users.services";
import { onValue, ref } from "firebase/database";
import { database } from "../../config/firebase-config";


const UserAnswers = () => {

  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [user, setUser] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState('');
  const [quizId, username] = id.split('--');
  const [answers, setAnswers] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getQuizById(quizId)
      .then((fetchedQuiz) => {
        setQuiz(fetchedQuiz);
      })
      .catch((error) => {
        toast.error("Error fetching quiz details:", error);
        setQuiz(null);
      });

      const dbRef = ref(database, `users/${username}`);
      const unsubscribe = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUser(data);
        }
      });
    
      return () => {
        unsubscribe();
      };
  }, [quizId, username]);

  const addCommentHandler = (answers) => {
    setShowInput(!showInput);
    setAnswers(answers)
  }

  const saveComment = (user, quiz) => {
    addCommentInUserResults(user, quiz, answers, comment)
    // navigate(0)
  }

  return (
    <>
      {quiz && <div className="ml-4 mt-4">
        <section className="bg-white dark:bg-white py-3 sm:py-5">
          <div className="px-4  max-w-screen-2xl lg:px-12">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-indigo-100 opacity-80 sm:rounded-lg mb-20">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-lg text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white">
                        <p className="text-lg">{quiz?.title}</p>
                        <p className="text-lg">{quiz?.category}</p>
                      </th>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white"></th>
                    </tr>
                  </thead>
                  {quiz.question.map((quest, i) => (
                    <tbody key={i}>
                      <tr className="border-b dark:border-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-200">
                        <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <p className="block text-lg">{quest.question}</p>
                          <div className="relative p-2">
                            <p className="block text-left">correct answer: {quest.answers.find(item => item.isCorrect === true)
                              ? quest.answers.find(item => item.isCorrect === true).text
                              : null}
                            </p>
                            <p className="block text-left">your answer:  {
                             user?.score[quiz?.title].userAnswers
                             ? user?.score[quiz?.title].userAnswers[i]
                               ? user?.score[quiz?.title].userAnswers[i].text
                               : '...'
                             : '...'
                            }</p>
                            {
                            user?.score[quiz?.title].userAnswers
                            && user?.score[quiz?.title].userAnswers[i]
                            && user?.score[quiz?.title].userAnswers[i].comment
                            && <p className="block text-left">{user?.score[quiz?.title].userAnswers[i].comment}</p>}
                          </div>
                        </th>
                        <th>
                          <button className="border px-2 hover:bg-indigo-300"
                            onClick={() => addCommentHandler(i)}>
                            add comment
                          </button>
                        </th>
                      </tr>
                      {showInput && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30">
                          <div className="bg-white p-4 items-center justify-end rounded ">
                            <textarea
                              rows="8"
                              className="rounded-lg w-full p-1 bg-white mt-2 -py focus-within:border-blue-500 focus:outline-none"
                              type="password"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />

                            <button className="" onClick={() => { setComment(''); setShowInput(false); saveComment(user.username, quiz?.title) }}>Save comment</button>
                            <button onClick={() => setShowInput(false)}>Cancel</button>

                          </div>
                        </div>
                      )}
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>}
    </>
  )
}

export default UserAnswers
