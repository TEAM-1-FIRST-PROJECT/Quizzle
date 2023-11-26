import PropTypes from "prop-types";
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import { updateUserScore } from "../../services/users.services"
import { useNavigate } from "react-router-dom";

const Summary = ({ id, score, title }) => {

  const { userData } = useContext(AuthContext)
  const navigate = useNavigate();
  const saveResultHandler = () => {
    updateUserScore(userData.username, id, title, score)
      .then(() => console.log('Quiz result saved successfully'))
      .catch((e) => console.error(e));
    navigate("/");

  }
  return (
    <div className=" bg-indigo-300 flex flex-col items-center justify-center h-screen">
      <button className="max-w-40rem mx-auto my-8 p-8 pt-10 bg-indigo-300 text-gray-800 rounded-lg shadow-md animate-slide-in-from-bottom"
        onClick={saveResultHandler}>
        <p className="text-lg">Quiz Completed!</p>
        <p className="text-lg">You score {score}</p>
        <div className="mb-4"></div>
        <p className="text-sm">click here to to save result</p>
      </button>
      <button className="mt-1 border-2 px-4 py-1" onClick={() => { }}>Next quiz</button>
    </div>
  )
}
Summary.propTypes = {
  score: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default Summary
