import React from "react";

export default function Progress({
  index,
  numOfQuestions,
  points,
  totalAvailablePoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        value={index + Number(answer !== null)}
        max={numOfQuestions}
      ></progress>
      <p>
        {index + 1} / {numOfQuestions}
      </p>
      <p>
        {points} / {totalAvailablePoints}
      </p>
    </header>
  );
}
