import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import toast from "react-hot-toast";

const PublicQuizResolved = ({ id, score, userAnswers }) => {

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

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
      {quiz && (
        <div className="h-screen flex flex-col bg-cover">
          <section className="m-20">
            <div className="px-4 w-full lg:px-12 ">
              <div className="relative overflow-hidden shadow-md opacity-80 sm:rounded-lg mb-20">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-lg text-gray-700 dark:text-gray-400">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 bg-indigo-500 text-black"
                        >
                          <div className="text-lg text-start">
                            <p className="text-white text-2xl">Title</p>
                            {quiz?.title}
                          </div>
                          <div className="text-lg text-end">
                            <p className="text-white text-2xl">Category</p>
                            {quiz?.category}
                          </div>
                          <p className="text-lg"> <p className="text-white text-2xl">Results</p>You score {score} on date</p>
                        </th>
                      </tr>
                    </thead>
                    {quiz.question.map((quest, i) => (
                      <tbody key={i}>
                        <tr className=" bg-gradient-to-b from-violet-200 to-indigo-300 hover:shadow-2xl hover:shadow-stone-400 transition-all duration-200 ease-in-out hover:scale-95">
                          <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                            <p className="block text-lg font-bold">
                              <p className="text-2xl">Question</p>
                              {quest.question}
                            </p>
                            <div className="relative p-2">
                              <p className="block text-lg font-bold mt-4">
                                Right answer: <span className=" text-green-500">{" "}
                                  {
                                    quest.answers.find(
                                      (item) => item.isCorrect === true
                                    )?.text
                                  }
                                </span>
                              </p>
                              <div className="block text-lg font-bold">
                                Your response: {"  "}
                                {
                                  userAnswers
                                    ? userAnswers[i]
                                      ? userAnswers[i].text
                                      : '...'
                                    : '...'
                                }
                              </div>
                            </div>
                          </th>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => navigate(-1)}>
                next Quiz
              </button>
            </div>

          </section>

        </div>
      )}
    </>
  );
}

PublicQuizResolved.propTypes = {
  score: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  userAnswers: PropTypes.array.isRequired,
}
export default PublicQuizResolved
