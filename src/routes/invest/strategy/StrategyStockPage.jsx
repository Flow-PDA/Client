import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StrategyStockPage() {
  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/stocks/investStrategy"
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect (() => {
    fetchData();
  }, []);
  return (
    <>
      <div>1</div>
    </>
  );
}
