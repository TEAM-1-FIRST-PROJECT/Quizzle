import { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    // Exit the effect if the timer reaches 0
    if (seconds === 0) return;

    // Interval to decrement the timer every second
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Cleanup the interval on component unmount or when the timer reaches 0
    return () => clearInterval(intervalId);
  }, [seconds]);

  // Format the seconds as mm:ss
  const formattedTime = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;

  return (
    <div className="text-right mr-4 mt-2 text-lg">
      {formattedTime}
    </div>
  );
};

export default Timer;
