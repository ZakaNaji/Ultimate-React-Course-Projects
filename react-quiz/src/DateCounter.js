import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + action.payload };
    case "DECREMENT":
      return { ...state, count: state.count + action.payload };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return { count: 0, step: 1 };
    default:
      return state;
  }
}

function DateCounter() {
  const [{ count, step }, dispatch] = useReducer(reducer, {
    count: 0,
    step: 1,
  });

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    dispatch({ type: "DECREMENT", payload: -step });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    dispatch({ type: "INCREMENT", payload: step });
  };

  const defineCount = function (e) {
    dispatch({ type: "SET_COUNT", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "SET_STEP", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
