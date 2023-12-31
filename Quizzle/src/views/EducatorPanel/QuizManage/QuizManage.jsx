import { useState, useEffect, useContext } from "react";
import "firebase/database";
import { quizzesRef, updateQuizData } from "../../../services/quiz.services";
import { onValue } from "firebase/database";
import { deleteQuiz } from "../../../services/admin.services";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/authContext";

const QuizManage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAnswers, setEditedAnswers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {userData} = useContext(AuthContext);
const username = userData?.username;
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
 <div className="h-screen pb-20 overflow-auto ">
    <div className="m-10 border-4 p-10 rounded-lg bg-gradient-to-bl from-indigo-400 dark:bg-gradient-to-br dark:from-zinc-600">
      <h1 className="mb-5 text-3xl text-white dark:text-zinc-200">Quiz Manage</h1>
      <input
        type="text"
        className=" p-2 rounded mb-5 placeholder-orange-300 dark:placeholder-orange-200 dark:bg-zinc-400 font-bold"
        placeholder="Search for Quiz..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table-auto rounded w-full text-center bg-gradient-to-bl from-indigo-400 to-cyan-400 text-white dark:text-zinc-200 dark:bg-gradient-to-br dark:from-zinc-600">
        <thead className=" text-lg border dark:bg-gradient-to-br dark:from-zinc-600">
          <tr>
            <th className=" px-4 py-2">Create By</th>
            <th className=" px-4 py-2">Quiz Title</th>
            <th className=" px-4 py-2">Created On</th>
            <th className=" px-4 py-2">Edit Quiz</th>
            <th className=" px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            quiz.createdBy === username && (
            <tr key={quiz.id} className="dark:bg-gradient-to-br dark:from-zinc-800 dark:text-zinc-200">
              <td className=" px-4 py-2">{quiz.createdBy}</td>
              <td className=" px-4 py-2">{quiz.title}</td>
              <td className=" px-4 py-2">
                {new Date(quiz.createdOn).toLocaleString()}
              </td>
              <td className=" px-4 py-2">
                <button
                  onClick={() => handleEditQuiz(quiz)}
                  className="ml-2 px-2 py-1 bg-blue-500 text-white dark:bg-blue-600 dark:text-zinc-200 rounded transform transition duration-500 ease-in-out hover:scale-90"
                >
                  Edit Quiz
                </button>
              </td>
              <td className=" px-4 py-2">
                <button
                  onClick={() => handleDelete(quiz.id)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white dark:text-zinc-200 dark:bg-red-700 rounded transform transition duration-500 ease-in-out hover:scale-90"
                >
                  Delete Quiz
                </button>
              </td>
              </tr>
              )
          ))}
        </tbody>
      </table>
      {selectedQuiz && selectedQuiz.question && (
        <div className="border-2 rounded mt-5 p-5 shadow-md table-auto w-full bg-gradient-to-br from-indigo-400 text-white dark:bg-gradient-to-br dark:from-zinc-800 dark:text-zinc-200">
          <h1 className=" text-3xl mb-6 font-bold text-white dark:text-zinc-200">Edit Quiz</h1>
          <h1 className="font-bold text-2xl"> Title: {editedTitle}</h1>
         
          {selectedQuiz.question.map((question, questionIndex) => (
            <div key={questionIndex} className="my-2">
              
              <span className="font-bold text-xl">
               Question: {question.question}
              </span>

              <div className="text-black">
                {question.answers.map((answer, index) => (
                  <input
                    key={index}
                    className="border-2 rounded p-2 w-full mt-2 dark:bg-zinc-400"
                    type="text"
                    value={answer.text}
                    onChange={(event) =>
                      handleAnswerChange(questionIndex, index, event)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
          <button
            role="alert"
            className="alert alert-success ml-2 bg-green-600 dark:bg-indigo-600 dark:text-zinc-100 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 transform transition duration-500 ease-in-out hover:scale-90"
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

export default QuizManage;
