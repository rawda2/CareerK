import React, { useState, useEffect } from 'react';

const Countdown= () => {
  // Initial time in seconds (1 hour)
  const initialTime = 1.5 * 60;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Perform actions when the timer reaches zero
          console.log('Countdown complete!');
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Convert seconds to hours, minutes, and seconds
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className=' d-flex gap-2'>
      <p><b>Ends In:</b></p>
      <p className=''><b>{`${minutes}m:${seconds}s`}</b></p>
    </div>
  );
};

export default Countdown;