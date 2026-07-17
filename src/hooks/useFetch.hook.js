import { useState, useEffect } from "react";
import { SHOP_URL } from "../configs/api.config";

/** Uses fetch. */
const useFetch = (resources) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!resources) return;
    setIsLoading(true);
    setError(null);
    fetch(SHOP_URL + resources)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [resources]);

  return [data, isLoading, error];
};

export default useFetch;
