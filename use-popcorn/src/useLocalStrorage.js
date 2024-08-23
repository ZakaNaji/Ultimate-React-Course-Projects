import { useEffect, useState } from "react";

export function useLocalStorage(key) {
  const [data, setData] = useState(() => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
}
