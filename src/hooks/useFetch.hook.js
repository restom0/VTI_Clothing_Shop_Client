import { useState, useEffect } from "react";
import { SHOP_LOCAL_URL } from "../configs/api.config";

const useFetch = (resources) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(SHOP_LOCAL_URL + resources)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [resources]);

  return [data];
};

export default useFetch;
