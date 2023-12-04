import PropTypes from "prop-types";
import { dateFormat } from "../../common/helpers";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getQuizById } from "../../services/quiz.services";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/authContext";


const QuizResolved = ({ id, score, resolvedOn }) => {

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const { userData } = useContext(AuthContext);

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
                          <p className="text-lg text-start">
                            <p className="text-white text-2xl">Title</p>
                            {quiz?.title}
                          </p>
                          <p className="text-lg text-end">
                            <p className="text-white text-2xl">Category</p>
                            {quiz?.category}
                          </p>
                          <p className="text-lg"> <p className="text-white text-2xl">Results</p>You score {score} on {dateFormat(resolvedOn)}</p>
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
                              <p className="block text-lg font-bold">
                                Your response: {" "}
                                {
                                  userData?.score[quiz?.title].userAnswers[i]
                                    .text
                                }
                              </p>
                            </div>
                          </th>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
QuizResolved.propTypes = {
  score: PropTypes.number.isRequired,
  resolvedOn: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  userAnswers: PropTypes.array.isRequired,
}
export default QuizResolved


// return (
//   <>
//     {quiz && <div className="ml-30 mt-10 bg-hero-pattern-2 bg-cover">
//       <section className="bg-white dark:bg-white py-3 sm:py-5 ">
//         <div className="px-4  max-w-screen-2xl lg:px-12">
//           <div className="relative overflow-hidden bg-white shadow-md dark:bg-indigo-100 opacity-80 sm:rounded-lg mb-20">
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//                 <thead className="text-lg text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                   <tr>
//                     <th scope="col" className="px-4 py-3 bg-indigo-500 text-white">
//                       <p className="text-lg">{quiz?.title}</p>
//                       <p className="text-lg">from category {quiz?.category}</p>
//                       <p className="text-lg">You score {score} on {dateFormat(resolvedOn)}</p>
//                     </th>
                    
//                   </tr>
//                 </thead>
//                 {quiz?.question.map((quest, i) => (
//                   <tbody key={i}>
//                     <tr className="border-b dark:border-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-200">
//                       <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                         <p className="block text-lg">{quest?.question}</p>
//                         <div className="relative p-2">
//                           <p className="block text-left">correct answer:{quest.answers.find(item => item.isCorrect === true)
//                             ? quest.answers.find(item => item.isCorrect === true).text
//                             : null}
//                           </p>
//                           <p className="block text-left">your answer: {userData?.score[quiz?.title].userAnswers[i].text}</p>
//                         </div>
//                       </th>                     
//                     </tr>
//                   </tbody>
//                 ))}
//               </table>
//             </div>
//           </div>
//         </div>
//       </section>
//       <button className="mt-1 ml-14 border-2 px-4 py-1" onClick={() => {navigate(-1) }}>Next quiz</button>
//     </div>}
//   </>
//   // <div className=" bg-indigo-300 flex flex-col items-center justify-center h-screen">
//   //   <button className="max-w-40rem mx-auto my-8 p-8 pt-10 bg-indigo-300 text-gray-800 rounded-lg shadow-md animate-slide-in-from-bottom"
//   //     onClick={() => { }}>
//   //     <p className="text-lg">This quiz is completed!</p>
//   //     <p className="text-lg">You score {score} on {dateFormat(resolvedOn)}</p>
//   //     <div className="mb-4"></div>
//   //   </button>
//   //   <button className="mt-1 border-2 px-4 py-1" onClick={() => {navigate('/') }}>Next quiz</button>
//   // </div>
// )