import PropTypes from "prop-types";
import { useState, useEffect } from 'react';

const Timer = ({ onTimerFinish, timeLimit }) => {
  const [seconds, setSeconds] = useState(timeLimit);

  useEffect(() => {
    if (seconds === 0) {
      onTimerFinish();
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);


    return () => clearInterval(intervalId);
  }, [seconds]);

   const formattedTime = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <div className="text-right mr-4 mt-2 text-lg">
      {formattedTime}
    </div>
  );
};
Timer.propTypes = {
  onTimerFinish: PropTypes.func.isRequired,
  timeLimit: PropTypes.number.isRequired,
};
export default Timer;
