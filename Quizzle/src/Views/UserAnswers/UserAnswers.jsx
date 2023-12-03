import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import toast from "react-hot-toast";
import { getUserByHandle } from "../../services/users.services";


const UserAnswers = () => {

  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [user, setUser] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState('');
  const [quizId, username] = id.split('--');

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

  const AddCommentHandler = () => {
    setShowInput(!showInput);
  }
  const saveComment = (user, quiz, i) => {
    console.log(comment, user, quiz, i)
    console.log()
  }
  //showInput ?  : console.log('close')

  return (
    <>
    
      {quiz && <div className="ml-48 mt-10">
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
                            <p className="block text-left">correct answer:{quest.answers.find(item => item.isCorrect === true)
                              ? quest.answers.find(item => item.isCorrect === true).text
                              : null}
                            </p>
                            <p className="block text-left">your answer: {user?.score[quiz?.title].userAnswers[i].text}</p>
                          </div>
                        </th>
                        
                        <th>
                          <button className="border"
                            onClick={AddCommentHandler}>
                            add comment<p>{i}</p>
                          </button>
                        </th>
                      </tr>
                      {showInput && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                          <div className="bg-white p-4 rounded">

                            <input
                              type="text"
                              placeholder={i}
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <button onClick={() => { setComment(''); setShowInput(false); saveComment(user.username, quiz?.title, i) }}>Save comment</button>
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
