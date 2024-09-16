export function getData(url, setData, setIsLoading, setError) {
  setIsLoading?.(true);
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setData(data);
    })
    .catch((error) => {
      setError?.(error.message);
    })
    .finally(() => {
      setIsLoading?.(false);
    });
}
