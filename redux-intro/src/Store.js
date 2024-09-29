import { combineReducers, createStore } from "redux";

const accountInitState = {
  amount: 0,
  loan: 0,
  loanPurpose: "",
};

function accountReducer(state = accountInitState, action) {
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
}

function diposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(loan, purpose) {
  return { type: "account/requestLoan", payload: { loan, purpose } };
}

function payLoan() {
  return { type: "account/payLoan" };
}

const customerInitState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function customerReducer(state = customerInitState, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/update":
      return {
        ...state,
        fullName: action.payload.fullName,
      };
    default:
      return state;
  }
}

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/create",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateCustomer(fullName) {
  return { type: "customer/update", payload: { fullName } };
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);
