import { useState, useEffect } from "react";
import "firebase/database";
import { quizzesRef, updateQuizData } from "../../../services/quiz.services";
import { onValue } from "firebase/database";
import { deleteQuiz } from "../../../services/admin.services";

//   const handleIsCorrectChange = (questionIndex, answerIndex, event) => {
//     const newQuestions = [...selectedQuiz.question];
//     newQuestions[questionIndex].answers[answerIndex].isCorrect = event.target.checked;
//     setSelectedQuiz({ ...selectedQuiz, question: newQuestions });
//   };
//   const [editedIsCorrect, setEditedIsCorrect] = useState(false);
const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAnswers, setEditedAnswers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onValue(quizzesRef, (snapshot) => {
      const data = snapshot.val();
      const filteredQuizzes = Object.values(data).filter(quiz =>
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

  const handleEditQuestion = (question) => {
    if (question && question.id) {
      setSelectedQuestion(question);
      setEditedQuestion(question.question);
      setEditedAnswers(question.answers);
    } else {
      console.error("Question or question.id is undefined");
    }
  };

  //let question = selectedQuiz ? selectedQuiz.question : null;

  // if (question) {
    // updateQuizData(quizId, )
    // ).then(() => {
      //     const updatedQuestion = {
    //       ...selectedQuestion,
    //       question: editedQuestion,
    //       answers: editedAnswers,
    //     };
    //     setSelectedQuestion(updatedQuestion);
    //   });
    // } else {
      //   console.error("selectedQuestion or selectedQuestion.id is undefined");
      // }
      
      //};
      
      const handleDelete = (id) => {
        deleteQuiz(id);
      };
      
      const handleTitleChange = (event) => {
        setEditedTitle(event.target.value);
      };
      
      const handleAnswerChange = (questionIndex, index, event) => {
       
        const newAnswers = {...selectedQuiz};  
        newAnswers.question[questionIndex].answers[index].text = event.target.value;
        setEditedAnswers(newAnswers);
      };
     
      const handleSaveQuestion = () => {
        updateQuizData(selectedQuiz.id,editedAnswers )
        .then(()=>console.log('ok'))
        .catch((e)=> console.log(e))
      }

      return (
        <div className="m-20 border p-10 rounded-lg">
      <h1 className="mb-2">Quiz Management</h1>
      <input
        type="text"
        className="border p-2 rounded mb-2"
        placeholder="Search for user..."
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
              <td className="border px-4 py-2">{quiz.question.length}</td>
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
        <div className="border-2 rounded mt-5 p-5 bg-white shadow-md">
          <h2 className="text-lg my-3 font-bold text-gray-700">Edit Quiz</h2>
          <input
            className="border-2 rounded p-2 w-full"
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
          />
          <h3 className="my-2 text-lg font-bold rounded p-2 border-2 bg-gray-100">
            Questions
          </h3>
          {selectedQuiz.question.map((question, questionIndex) => (
            <div key={questionIndex} className="my-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleEditQuestion(question)}
              >
                {question.question}
              </button>

              <div className="mt-2">
                <input
                  className="border-2 rounded p-2 w-full"
                  type="text"
                  value={editedQuestion}
                  onChange={(event) => setEditedQuestion(event.target.value)}
                />
                {question.answers.map((answer, index) => (
                  <input
                    key={index}
                    className="border-2 rounded p-2 w-full mt-2"
                    type="text"
                    value={answer.text}
                    onChange={(event) => handleAnswerChange(questionIndex, index, event)}
                  />
                ))}
                <button
                  className="ml-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={handleSaveQuestion}
                >
                  Save changes
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizManagement;

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
