import React from "react";

export default function NextButton({
  answer,
  dispatch,
  index,
  numberOfQuestions,
}) {
  if (answer === null) {
    return null;
  }
  const text = index < numberOfQuestions - 1 ? "Next" : "Finish";
  const handleClick = () => {
    if (index < numberOfQuestions - 1) {
      dispatch({ type: "nextQuestion" });
    } else {
      dispatch({ type: "finish" });
    }
  };
  return (
    <button className="btn btn-ui" onClick={handleClick}>
      {text}
    </button>
  );
}
