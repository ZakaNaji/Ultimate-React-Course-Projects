import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:3001";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
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

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
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
