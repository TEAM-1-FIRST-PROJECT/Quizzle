import PropTypes from "prop-types";
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { updateUserScore } from "../../services/users.services"
import toast from "react-hot-toast";
import {
  removeAssignmentsFromQuiz,
  removeAssignmentsFromUser,
  removeFromAssignments
} from "../../services/quiz.services";

const Summary = ({ id, score, title, category, userAnswers }) => {

  const { userData } = useContext(AuthContext);

  updateUserScore(userData.username, id, title, score, category, userAnswers)
    .then(() => console.log('Quiz result saved successfully'))
    .catch((e) => toast.error(e));

  removeFromAssignments(userData.username, id)
    .then(() => console.log('Quiz assignment updated successfully'))
    .catch((e) => toast.error(e));

  removeAssignmentsFromQuiz(userData.username, id)
    .then(() => console.log('Quiz assignment updated successfully'))
    .catch((e) => toast.error(e));

  removeAssignmentsFromUser(userData.username, id)
    .then(() => console.log('Quiz assignment updated successfully'))
    .catch((e) => toast.error(e));

  return (
    <>
      {/* <div className=" bg-indigo-300 flex flex-col items-center justify-center h-screen">
        <button className="max-w-40rem mx-auto my-8 p-8 pt-10 bg-indigo-300 text-gray-800 rounded-lg shadow-md animate-slide-in-from-bottom">
          <p className="text-lg">Quiz Completed!</p>
          <p className="text-lg">You score {score}</p>
        </button>
        <button className="mt-1 border-2 px-4 py-1" onClick={() => { navigate('/') }}>Next quiz</button>
      </div> */}
      {/* {quiz && <div className="ml-48 mt-10 bg-hero-pattern-2 bg-cover">
        <section className="bg-white dark:bg-white py-3 sm:py-5 ">
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
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white"></th>
                      <th scope="col" className="px-4 py-3 bg-indigo-500 text-white"></th>
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
                            <p className="block text-left">your answer: {userAnswers[i].text}</p>
                          </div>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                        <th>
                        </th>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>} */}

    </>
  )
}

Summary.propTypes = {
  score: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  userAnswers: PropTypes.object.isRequired,
};
export default Summary
