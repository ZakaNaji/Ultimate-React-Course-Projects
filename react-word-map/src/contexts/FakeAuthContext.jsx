import { useReducer, createContext, useContext } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const FakeAuthContext = createContext();

const initState = {
  user: null,
  isAuth: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    default:
      return state;
  }
}

function FakeAuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initState);

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "LOGIN", payload: FAKE_USER });
    } else {
      throw new Error("Invalid email or password");
    }
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <FakeAuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

function useFakeAuth() {
  const context = useContext(FakeAuthContext);
  if (!context) {
    throw new Error("useFakeAuth must be used within a FakeAuthProvider");
  }
  return context;
}

export { FakeAuthProvider, useFakeAuth };
