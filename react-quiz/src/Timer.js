import React, { useEffect } from "react";

export default function Timer({ remainingSeconds, dispatch }) {
  useEffect(() => {
    const intervale = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(intervale);
  }, [dispatch]);
  return (
    <div className="timer">{displaySecondsAsMinSec(remainingSeconds)}</div>
  );
}

function displaySecondsAsMinSec(remainingSeconds) {
  const min = Math.floor(remainingSeconds / 60);
  const sec = remainingSeconds % 60;
  const minDisplay = min < 10 ? `0${min}` : min;
  const secDisplay = sec < 10 ? `0${sec}` : sec;

  return `${minDisplay}:${secDisplay}`;
}
