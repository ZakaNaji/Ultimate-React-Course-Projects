import { createStore } from "redux";

const initState = {
  amount: 0,
  loan: 0,
  loanPurpose: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, amount: state.amount + action.payload };
    case "account/withdraw":
      return { ...state, amount: state.amount - action.payload };
    case "account/loanPurpose":
      return { ...state, loanPurpose: action.payload };
    case "account/requestLoan":
      if (state.loan > 0) {
        return state;
      }
      return {
        ...state,
        loan: action.payload.loan,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return { ...state, loan: 0, loanPurpose: "" };
    default:
      return state;
  }
};
const store = createStore(reducer);

function diposit(amount) {
  store.dispatch({ type: "account/deposit", payload: amount });
}

function withdraw(amount) {
  store.dispatch({ type: "account/withdraw", payload: amount });
}

function requestLoan(loan, purpose) {
  store.dispatch({ type: "account/requestLoan", payload: { loan, purpose } });
}

function payLoan() {
  store.dispatch({ type: "account/payLoan" });
}
