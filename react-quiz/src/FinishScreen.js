import React from "react";

export default function FinishScreen({
  points,
  totalAvailablePoints,
  dispatch,
}) {
  return (
    <>
      <p className="result">
        {getImpressions(getPercentage(points, totalAvailablePoints))}
        You have finished the quiz! <br />
        Your score is: {points} out of {totalAvailablePoints} (
        {getPercentage(points, totalAvailablePoints)}%)
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Reset
      </button>
    </>
  );
}

function getPercentage(points, totalAvailablePoints) {
  return Math.round((points / totalAvailablePoints) * 100);
}

function getImpressions(percent) {
  let imoji = "";
  if (percent < 30) {
    imoji = "😞";
  } else if (percent < 70) {
    imoji = "😐";
  } else {
    imoji = "😊";
  }
  return imoji;
}
