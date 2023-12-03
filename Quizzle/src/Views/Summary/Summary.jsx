import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getQuizById } from "../../services/quiz.services";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/authContext";

const SeeSummary = () => {

  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const { userData } = useContext(AuthContext)
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
    <>
      {quiz && <div className="ml-48 mt-10 bg-hero-pattern-2 bg-cover">
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
                            <p className="block text-left">your answer: {userData?.score[quiz?.title].userAnswers[i].text}</p>
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
      </div>}
    </>
  )
}

export default SeeSummary
