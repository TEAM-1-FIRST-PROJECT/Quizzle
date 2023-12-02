import PropTypes from "prop-types";
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { updateUserScore } from "../../services/users.services"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  removeAssignmentsFromQuiz,
  removeAssignmentsFromUser,
  removeFromAssignments
} from "../../services/quiz.services";

const Summary = ({ id, score, title, category, userAnswers }) => {

  const { userData } = useContext(AuthContext)
  const navigate = useNavigate();

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
    <div className=" bg-indigo-300 flex flex-col items-center justify-center h-screen">
      <button className="max-w-40rem mx-auto my-8 p-8 pt-10 bg-indigo-300 text-gray-800 rounded-lg shadow-md animate-slide-in-from-bottom">
        <p className="text-lg">Quiz Completed!</p>
        <p className="text-lg">You score {score}</p>
      </button>
      <button className="mt-1 border-2 px-4 py-1" onClick={() => { navigate('/') }}>Next quiz</button>
    </div>
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
