import { createSlice } from "@reduxjs/toolkit";

const accountInitState = {
  amount: 0,
  loan: 0,
  loanPurpose: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState: accountInitState,
  reducers: {
    diposit(state, action) {
      state.amount += action.payload;
    },
    withdraw(state, action) {
      state.amount -= action.payload;
    },
    requestLoan: {
      reducer(state, action) {
        if (state.loan > 0) {
          return;
        }
        state.loan = action.payload.loan;
        state.loanPurpose = action.payload.purpose;
        state.amount += action.payload.loan;
      },
      prepare(loan, purpose) {
        return { payload: { loan, purpose } };
      },
    },
    payLoan(state) {
      state.amount -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export function diposit(amount, currency) {
  if (currency === "USD") {
    return { type: "account/diposit", payload: amount };
  }
  return async (dispatch) => {
    const resp = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await resp.json();
    const convertedAmount = data.rates.USD;
    dispatch({ type: "account/diposit", payload: convertedAmount });
  };
}
export default accountSlice.reducer;
