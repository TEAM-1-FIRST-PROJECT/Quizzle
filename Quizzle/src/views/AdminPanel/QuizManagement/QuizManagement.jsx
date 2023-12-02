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
    <div className="m-20 border p-10 rounded-lg">
      <h1 className="mb-2">Quiz Management</h1>
      <input
        type="text"
        className="border p-2 rounded mb-2 w-1/4"
        placeholder="Search by title or creator..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table-auto rounded w-full text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white">
        <thead className=" text-lg">
          <tr>
            <th className="border px-4 py-2">Create By</th>
            <th className="border px-4 py-2">Quiz Title</th>
            <th className="border px-4 py-2">Questions</th>
            <th className="border px-4 py-2">Created On</th>
            <th className="border px-4 py-2">Edit</th>
            <th className="border px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            
            <tr key={quiz.id}>
              <td className="border px-4 py-2">{quiz.createdBy}</td>
              <td className="border px-4 py-2">{quiz.title}</td>
              <td className="border px-4 py-2">{quiz.question?.length}</td>
              <td className="border px-4 py-2">
                {new Date(quiz.createdOn).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEditQuiz(quiz)}
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(quiz.id)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedQuiz && selectedQuiz.question && (
        <div className="border-2 rounded mt-5 p-5 bg-white shadow-md table-auto w-full bg-gradient-to-r from-indigo-400 to-cyan-400 text-black">
          <h1 className="text-lg my-3 font-bold text-gray-700">Edit Quiz</h1>
          <h2 className="my-2 text-lg font-bold rounded p-2 border-2 bg-gray-100">
            {editedTitle}
          </h2>
          <h3 className="my-2 text-lg font-bold rounded p-2 border-2 bg-gray-100">
            Questions
          </h3>
          {selectedQuiz.question.map((question, questionIndex) => (
            <div key={questionIndex} className="my-2">
              <span className="font-bold text-gray-700">
                {question.question}
              </span>

              <div className="text-black">
                {question.answers.map((answer, index) => (
                  <input
                    key={index}
                    className="border-2 rounded p-2 w-full mt-2"
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
            className="alert alert-success ml-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handleSaveQuestion}
          >
            Save changes
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizManagement;

