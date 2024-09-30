const accountInitState = {
  amount: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = accountInitState, action) {
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
        amount: state.amount + action.payload.loan,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        amount: state.amount - state.loan,
      };
    default:
      return state;
  }
}

export function diposit(amount, currency) {
  if (currency === "USD") {
    return { type: "account/deposit", payload: amount };
  }
  return async (dispatch) => {
    const resp = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await resp.json();
    const convertedAmount = data.rates.USD;
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(loan, purpose) {
  return { type: "account/requestLoan", payload: { loan, purpose } };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
