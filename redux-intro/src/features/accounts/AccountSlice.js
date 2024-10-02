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

export const { diposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
