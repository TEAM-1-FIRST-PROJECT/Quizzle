import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getAllQuizzes, updateQuizData } from "../../../services/quiz.services";
import { dateFormat } from "../../../common/helpers.js";

const GroupQuizzes = () => {
  const { groupId } = useParams();

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [groupMembers, setGroupMembers] = useState([]);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAnswers, setEditedAnswers] = useState([]);
  const [quizzes, setQuizzes] = useState([{}]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);


  useEffect(() => {
    getAllQuizzes()
      .then(snapshot => {
        setQuizzes(snapshot)
      })
      .catch(e => toast.error(e.message));
  }, []);

  useEffect(() => {
    const filtered = quizzes.filter(
      (quiz) => quiz.title && quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuizzes(filtered);
  }, [searchTerm, quizzes]);

  useEffect(() => {
    if (groupMembers.length > 0) {
      const filtered = quizzes.filter(quiz => groupMembers.includes(quiz.createdBy));
      setFilteredQuizzes(filtered);
    }
  }, [quizzes, groupMembers]);

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    if (quiz.question && quiz.question.length > 0) {
      const firstQuestion = quiz.question[0];
      setSelectedQuestion(firstQuestion);
      setEditedAnswers(firstQuestion.answers);
    }
    setEditedTitle(quiz.title);
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

  //   const handleRemoveMember = () => {
  //     getGroupDetails(groupId)
  //       .then((snapshot) => {
  //         const group = snapshot.val();
  //         const members = Object.keys(group.members).map((memberId) => {
  //           return memberId;
  //         });
  //         return members;
  //       })
  //       .then((result) => {
  //         console.log(result.toString());
  //         toast.success("Member removed successfully");
  //         // removeEducator(groupId, memberId)
  //       });
  //   };


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col h-screen overflow-auto">
    <div className="p-4 m-20 border shadow-md rounded bg-gradient-to-br from-violet-400 to-cyan-400 dark:bg-gradient-to-br dark:from-zinc-600 max-w-full md:max-w-7xl ">
      <input
        type="text"
        className="border p-2 rounded w-full placeholder-amber-300 font-bold sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 dark:placeholder-orange-200 dark:bg-zinc-500"
        placeholder="Search for user..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mt-4 overflow-x-auto">
        <table className="table-auto rounded w-full text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-white dark:text-zinc-200 dark:bg-gradient-to-br dark:from-zinc-800">
          <thead className="border text-lg">
            <tr>
              <th className="px-4 py-2">Quiz title</th>
              <th className="px-4 py-2">Created by</th>
              <th className="px-4 py-2">Created on</th>
              <th className="px-4 py-2">Edit</th>
            </tr>
          </thead>
          <tbody className="border">
            {quizzes.map((quiz) => {
              return (
                <tr key={quiz.id} className="border">
                  <td className="px-4 py-2">{quiz.title}</td>
                  <td className="px-4 py-2">{quiz.createdBy}</td>
                  <td className="px-4 py-2">{dateFormat(quiz.createdOn)}</td>
                  <td className="px-4 py-2">
                    <button className="ml-2 px-2 py-1 bg-blue-500 text-white rounded dark:bg-blue-600 dark:text-zinc-200" onClick={() => handleEditQuiz(quiz)}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4 dark:text-zinc-200">
          <div>
            Showing {indexOfFirstUser + 1}-{indexOfLastUser} of {users.length}
          </div>
          <div>
            <button
              className="bg-blue-500 text-white dark:text-zinc-200 dark:bg-blue-600 px-4 py-2 rounded mr-2"
              onClick={() =>
                paginate(currentPage > 1 ? currentPage - 1 : currentPage)
              }
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
            </span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2 dark:text-zinc-200 dark:bg-blue-600"
              onClick={() =>
                paginate(
                  currentPage < Math.ceil(users.length / usersPerPage)
                    ? currentPage + 1
                    : currentPage
                )
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
        {selectedQuiz && selectedQuiz.question && (
          <div className="border-2 rounded mt-5 p-5 shadow-md table-auto w-full bg-gradient-to-r from-indigo-400 to-cyan-400 text-black dark:bg-gradient-to-r dark:from-zinc-800 dark:text-zinc-100">
            <h1 className="text-lg my-3 font-bold text-gray-700 dark:text-zinc-200">Edit Quiz</h1>
            <h2 className="my-2 text-lg font-bold p-2 border-b dark:text-zinc-200">
              Quiz Title - {editedTitle}
            </h2>
            <h3 className="my-2 text-lg font-bold rounded p-2 dark:text-zinc-200">
              Questions
            </h3>
            {selectedQuiz.question.map((question, questionIndex) => (
              <div key={questionIndex} className="my-2">
                <span className="font-bold text-gray-700 dark:text-zinc-200">
                  {question.question}
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
              className="alert alert-success ml-2 bg-green-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 hover:bg-green-700 text-white dark:text-zinc-200 font-bold py-2 px-4 rounded mt-2"
              onClick={handleSaveQuestion}
            >
              Save changes
            </button>
          </div>
            )}
    </div>
  </div>
  );
}
export default GroupQuizzes;