import { useState, useEffect } from "react";
import "firebase/database";
import { quizzesRef } from "../../../services/quiz.services";
import { onValue, ref, update } from "firebase/database";
import { deleteQuiz } from "../../../services/admin.services";
import { database } from "../../../config/firebase-config";

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");

  useEffect(() => {
    onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();
      setQuizzes(Object.values(data));
    });
  }, []);

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setSelectedQuestion(null);
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setEditedQuestion(question.question);
  };

  const handleSaveQuestion = () => {
    const questionRef = ref(
      database,
      `quizzes/${selectedQuiz.id}/questions/${selectedQuestion.id}`
    );
    update(questionRef, { question: editedQuestion });
    setSelectedQuestion(null);
    setEditedQuestion("");
  };

  const handleDelete = (id) => {
    deleteQuiz(id);
  };

  // return (
  //   <div className="p-4 text-center items-center, justify-center m-14">
  //     <h1 className="text-xl mb-4">Quiz Management</h1>
  //     {quizzes.map((quiz) => (
  //       <div key={quiz.id} className="mb-2">
  //         <span>{quiz.title}</span>
  //         <button
  //           onClick={() => handleEditQuiz(quiz)}
  //           className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
  //         >
  //           Edit
  //         </button>
  //         <button
  //           onClick={() => handleDelete(quiz.id)}
  //           className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
  //         >
  //           Delete
  //         </button>
  //       </div>
  //     ))}
  //     {selectedQuiz && (
  //       <div>
  //         <h2 className="text-lg my-2">Edit Quiz</h2>
  //         {/* Form for editing a quiz */}
  //         {Object.values(selectedQuiz.question).map((question, index) => (
  //           <div key={index}>
  //             <h3>{question.question}</h3>
  //             {Object.values(question.answers).map((answer, index) => (
  //               <div key={index}>
  //                 <span>{answer.text}</span>
  //                 <button
  //                   onClick={() => handleEditQuestion(answer)}
  //                   className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
  //                 >
  //                   Edit
  //                 </button>
  //               </div>
  //             ))}
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //     {selectedQuestion && (
  //       <div>
  //         <h2 className="text-lg my-2">Edit Answers</h2>
  //         <input
  //           type="text"
  //           value={editedQuestion}
  //           onChange={(e) => setEditedQuestion(e.target.value)}
  //           className="border p-1 rounded"
  //         />
  //         <button
  //           onClick={handleSaveQuestion}
  //           className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
  //         >
  //           Save
  //         </button>
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="m-20">
      <h1>Quiz Management</h1>
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
          <tr key="">
            <td className="border px-4 py-2">{/* username */}</td>
            <td className="border px-4 py-2">{/* Quiz Title */}</td>
            <td className="border px-4 py-2">{/* Questions */}</td>
            <td className="border px-4 py-2">{/*Created on*/}</td>
            <td className="border px-4 py-2">{/*Edit*/}</td>
            <td className="border px-4 py-2">{/*Delete*/}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default QuizManagement;
