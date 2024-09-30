import { applyMiddleware, combineReducers, createStore } from "redux";
import customerReducer from "./features/customers/CustomerSlice";
import accountReducer from "./features/accounts/AccountSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
