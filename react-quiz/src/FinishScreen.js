import React from "react";

export default function FinishScreen({ points, totalAvailablePoints }) {
  return (
    <p className="result">
      You have finished the quiz! <br />
      Your score is: {points} out of {totalAvailablePoints} (
      {Math.round((points / totalAvailablePoints) * 100)}%)
    </p>
  );
}
