import { useState, useEffect } from "react";
import "firebase/database";
import { quizzesRef, updateQuizData } from "../../../services/quiz.services";
import { onValue } from "firebase/database";
import { deleteQuiz } from "../../../services/admin.services";
import toast from "react-hot-toast";

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAnswers, setEditedAnswers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();
      const filteredQuizzes = Object.values(data).filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setQuizzes(filteredQuizzes);
    });
  }, [searchTerm]);

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    if (quiz.question && quiz.question.length > 0) {
      const firstQuestion = quiz.question[0];
      setSelectedQuestion(firstQuestion);
      setEditedAnswers(firstQuestion.answers);
    }
    setEditedTitle(quiz.title);
  };

  const handleDelete = (id) => {
    deleteQuiz(id);
  };

  const handleAnswerChange = (questionIndex, index, event) => {
    const newAnswers = { ...selectedQuiz };
    newAnswers.question[questionIndex].answers[index].text = event.target.value;
    setEditedAnswers(newAnswers);
  };

  const handleSaveQuestion = () => {
    updateQuizData(selectedQuiz.id, editedAnswers)
      .then(() => toast.success("Quiz updated successfully"))
      .catch((e) => console.log(e));
  };

  return (
    <div className="h-screen flex flex-col overflow-auto">
      <div className="md:m-14 opacity-95 bg-gradient-to-br from-indigo-400 dark:bg-gradient-to-br dark:from-zinc-600 border rounded-lg p-6">
        <h1 className="mb-10 text-3xl dark:text-zinc-200">Quiz Management</h1>
        <input
          type="text"
          className="border p-2 rounded mb-2 w-full md:w-1/4 placeholder-orange-300 dark:placeholder-orange-200 dark:bg-zinc-400 font-bold"
          placeholder="Search by title or creator..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="">
          <table className="table-auto mt-2 rounded w-full text-center bg-gradient-to-br from-indigo-400 to-cyan-400 dark:from-zinc-800 text-white dark:text-zinc-200">
            <thead className="text-lg">
              <tr className="border border-indigo-500 dark:border-indigo-700">
                <th className="px-4 py-2">Create By</th>
                <th className="px-4 py-2">Quiz Title</th>
                <th className="px-4 py-2">Questions</th>
                <th className="px-4 py-2">Created On</th>
                <th className="px-4 py-2">Edit</th>
                <th className="px-4 py-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <tr key={quiz.id} className="border border-indigo-500 dark:border-indigo-700 dark:gradient-to-br dark:from-zinc-800 dark:text-zinc-200">
                  <td className="px-4 py-2">{quiz.createdBy}</td>
                  <td className="px-4 py-2">{quiz.title}</td>
                  <td className="px-4 py-2">{quiz.question?.length}</td>
                  <td className="px-4 py-2">
                    {new Date(quiz.createdOn).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEditQuiz(quiz)}
                      className="ml-2 px-2 py-1 bg-blue-500 dark:bg-blue-600 dark:text-zinc-200 text-white rounded"
                    >
                      Edit Quiz
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="ml-2 px-2 py-1 bg-red-500 dark:bg-red-600 dark:text-zinc-200 text-white rounded"
                    >
                      Delete Quiz
                    </button>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                <td colSpan="6" className="px-4 py-2 text-2xl">No results found</td>
              </tr>
              )
            }
            </tbody>
          </table>
        </div>
        {selectedQuiz && selectedQuiz.question && (
          <div className="border-2 border-rose-300 dark:border-indigo-600 mb-10 rounded-lg mt-5 p-5 shadow-md table-auto w-full bg-gradient-to-r from-indigo-400 to-cyan-400 dark:from-zinc-800  text-black">
            <h1 className="font-bold text-black dark:text-zinc-200 text-2xl">Quiz Edit</h1>
            <h2 className="my-2 text-xl font-bold rounded p-2 text-center dark:text-zinc-200">
              Title - {editedTitle}
            </h2>
            <h3 className="my-2 text-lg font-bold text-start rounded dark:text-zinc-200 p-2">
              Questions
            </h3>
            {selectedQuiz.question.map((question, questionIndex) => (
              <div key={questionIndex} className="my-2">
                <span className="font-bold text-black dark:text-zinc-200">
                  {question.question}
                </span>

                <div className="text-black">
                  {question.answers.map((answer, index) => (
                   <div key={index} className="flex items-center">
                     <span className="text-red-500 mr-2">*</span>
                   <input
                     key={index}
                     className="border-2 rounded p-2 w-full mt-2 placeholder-indigo-300 dark:bg-zinc-400"
                     placeholder="Write an answer..."
                     type="text"
                     value={answer.text}
                     onChange={(event) =>
                       handleAnswerChange(questionIndex, index, event)
                     }
                   />
                 </div>
                  ))}
                </div>
              </div>
            ))}
            <button
              role="alert"
              className="alert alert-success ml-2 bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 dark:text-zinc-200 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleSaveQuestion}
            >
              Save changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizManagement;
