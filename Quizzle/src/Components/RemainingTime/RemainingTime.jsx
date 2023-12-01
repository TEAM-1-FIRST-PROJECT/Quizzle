import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { updateUserScore } from "../../services/users.services";
import toast from "react-hot-toast";
import { removeFromAssignments,
 removeAssignmentsFromQuiz,
removeAssignmentsFromUser} from "../../services/quiz.services";

const RemainingTime = ({ timeLimit, username, id, title, score, category }) => {
  const [seconds, setSeconds] = useState(timeLimit);

  useEffect(() => {
    if (seconds === 0) {
      updateUserScore(username, id, title, score, category)
        .then(() => console.log('Quiz result saved successfully'))
        .catch((e) => toast.error(e));

        removeFromAssignments(username, id)
        .then(() => console.log('Quiz assignment updated successfully'))
        .catch((e) => toast.error(e));
    
      removeAssignmentsFromQuiz(username, id)
        .then(() => console.log('Quiz assignment updated successfully'))
        .catch((e) => toast.error(e));
    
      removeAssignmentsFromUser(username, id)
        .then(() => console.log('Quiz assignment updated successfully'))
        .catch((e) => toast.error(e));
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds, username, id, title, score, category]);

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;


  return (
    <div className="text-right mr-4 mt-2 text-lg">
      {formattedTime}
    </div>
  );
};

RemainingTime.propTypes = {
  onTimerFinish: PropTypes.func.isRequired,
  timeLimit: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

export default RemainingTime
