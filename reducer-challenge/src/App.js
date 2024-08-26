import { useReducer } from "react";
import "./App.css";

const initialState = {
  balance: 0,
  loan: 0,
};

const reducer = (state, action) => {};

function App() {
  const [{ balance, loan }, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <h1>useReducer bank account</h1>
      <div>Balance: X</div>
      <div>Loan: Y</div>
      <div>
        <button type="button">open account</button>
      </div>
      <div>
        <button type="button">Diposite X</button>
      </div>
      <div>
        <button type="button">Widraw x</button>
      </div>
      <div>
        <button type="button">Request a loan of x</button>
      </div>
      <div>
        <button type="button">Pay loan</button>
      </div>
      <div>
        <button type="button">Close account</button>
      </div>
    </div>
  );
}

export default App;
