import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:3001";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CITIES":
      return { ...state, cities: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_CURRENT_CITY":
      return { ...state, currentCity: action.payload };
    default:
      return state;
  }
};

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, isLoading, currentCity } = state;
  const setIsLoading = (isLoading) => {
    dispatch({ type: "SET_IS_LOADING", payload: isLoading });
  };
  const setCities = (cities) => {
    dispatch({ type: "SET_CITIES", payload: cities });
  };
  const setCurrentCity = (city) => {
    dispatch({ type: "SET_CURRENT_CITY", payload: city });
  };

  const fetchData = async (url, setData) => {
    try {
      setIsLoading(true);
      const resp = await fetch(url);
      const data = await resp.json();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getCity = async (id) =>
    fetchData(`${BASE_URL}/cities/${id}`, setCurrentCity);

  useEffect(() => {
    fetchData(`${BASE_URL}/cities`, setCities);
  }, []);

  function createCity(city) {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(city),
    })
      .then((response) => response.json())
      .then((data) => {
        setCities([...cities, data]);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

  function deleteCity(id) {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCities(cities.filter((city) => city.id !== id));
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        setIsLoading,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
