import customerReducer from "./features/customers/CustomerSlice";
import accountReducer from "./features/accounts/AccountSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
