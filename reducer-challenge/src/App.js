import { useReducer } from "react";
import "./App.css";

const initialState = {
  balance: 0,
  loan: 0,
  status: "closed",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, status: "open", balance: 500 };
    case "diposite":
      return { ...state, balance: state.balance + action.payload };
    case "widraw":
      return { ...state, balance: state.balance - action.payload };
    case "getLoan":
      if (state.loan > 0) {
        return state;
      }
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "payLoan":
      if (state.loan === 0) {
        return state;
      }
      return {
        ...state,
        loan: state.loan - action.payload,
        balance: state.balance - action.payload,
      };
    case "close":
      if (state.balance > 0 || state.loan > 0) {
        return state;
      }
      return { ...state, status: "closed" };
    default:
      return state;
  }
};

const DIPOSIT_AMOUNT = 100;
const WIDRAW_AMOUNT = 50;
const LOAN_AMOUNT = 1000;

function App() {
  const [{ balance, loan, status }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const isClosed = status === "closed";

  return (
    <div className="App">
      <h1>useReducer bank account</h1>
      <div>Balance: {balance}</div>
      <div>Loan: {loan}</div>
      <div>
        <button type="button" onClick={() => dispatch({ type: "open" })}>
          open account
        </button>
      </div>
      <div>
        <button
          type="button"
          disabled={isClosed}
          onClick={() =>
            dispatch({ type: "diposite", payload: Number(DIPOSIT_AMOUNT) })
          }
        >
          Diposite {DIPOSIT_AMOUNT}
        </button>
      </div>
      <div>
        <button
          type="button"
          disabled={isClosed}
          onClick={() =>
            dispatch({ type: "widraw", payload: Number(WIDRAW_AMOUNT) })
          }
        >
          Widraw {WIDRAW_AMOUNT}
        </button>
      </div>
      <div>
        <button
          type="button"
          disabled={isClosed}
          onClick={() =>
            dispatch({ type: "getLoan", payload: Number(LOAN_AMOUNT) })
          }
        >
          Request a loan of {LOAN_AMOUNT}
        </button>
      </div>
      <div>
        <button
          type="button"
          disabled={isClosed}
          onClick={() =>
            dispatch({ type: "payLoan", payload: Number(LOAN_AMOUNT) })
          }
        >
          Pay loan
        </button>
      </div>
      <div>
        <button
          type="button"
          disabled={isClosed}
          onClick={() => dispatch({ type: "close" })}
        >
          Close account
        </button>
      </div>
    </div>
  );
}

export default App;
