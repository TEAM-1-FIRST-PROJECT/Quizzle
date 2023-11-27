import PropTypes from "prop-types";
import { dateFormat } from "../../common/helpers";
import { useNavigate } from "react-router-dom";

const QuizResolved = ({ score, resolvedOn }) => {

  const navigate= useNavigate();

  return (
    <div className=" bg-indigo-300 flex flex-col items-center justify-center h-screen">
      <button className="max-w-40rem mx-auto my-8 p-8 pt-10 bg-indigo-300 text-gray-800 rounded-lg shadow-md animate-slide-in-from-bottom"
        onClick={() => { }}>
        <p className="text-lg">This quiz is completed!</p>
        <p className="text-lg">You score {score} on {dateFormat(resolvedOn)}</p>
        <div className="mb-4"></div>
      </button>
      <button className="mt-1 border-2 px-4 py-1" onClick={() => {navigate('/') }}>Next quiz</button>
    </div>
  )
}
QuizResolved.propTypes = {
  score: PropTypes.number.isRequired,
  resolvedOn: PropTypes.string.isRequired,
}
export default QuizResolved
