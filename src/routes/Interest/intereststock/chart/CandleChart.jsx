import React, { useCallback, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { fetchStockPrice } from "../../../../lib/apis/stock";

export default function CandleChart({ mode, stockKey, price }) {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("line");
  const [noContent, setNoContent] = useState(false);
  const [prevDateCnt, setPrevDateCnt] = useState(1);
  const [chartInterval, setChartInterval] = useState(1);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const currentDate = new Date();
      const { interval, fromDate } = getFromDate(currentDate);

      const currentTimeStr = getTimeString(currentDate);
      const fromTimeStr = getTimeString(fromDate);

      console.log(currentTimeStr, fromTimeStr, interval);

      const response = await fetchStockPrice(
        stockKey,
        interval,
        fromTimeStr,
        currentTimeStr
      );

      if (response.result.length > 1) {
        const newList = response.result?.map((elem, index) => {
          const timeStr = elem.localDate ? elem.localDate : elem.localDateTime;
          return {
            // x: elem.localDate ? elem.localDate : elem.localDateTime,
            x: timeStrToTimestamp(timeStr),
            y: [
              elem.openPrice,
              elem.highPrice,
              elem.lowPrice,
              elem.closePrice
                ? elem.closePrice
                : Number.parseInt(elem.currentPrice),
            ],
          };
          // return elem.closePrice;
        });
        setData(newList);
        // console.log(newList[1].x - newList[0].x);
        setChartInterval(newList[1].x - newList[0].x);
      } else {
        setNoContent(true);
      }
    }
    if (mode === "day") setChartType("candlestick");
    else setChartType("line");
    fetchData();
  }, [mode]);

  useEffect(() => {
    let timerId;
    if (chartInterval > 0) {
      timerId = setInterval(() => {
        console.log(`${chartInterval} passed, Update data`);
        setUpdateData(true);
      }, (chartInterval / 100) * 60 * 1000);
    }

    return () => clearInterval(timerId);
  }, [chartInterval]);

  useEffect(() => {
    if (updateData) {
      const currentDate = new Date(Date.now());
      const fromDate = new Date(Date.now() - 1000 * 60 * (100 / 100));

      const fromString = getTimeString(fromDate);
      const currentString = getTimeString(currentDate);

      fetchStockPrice(stockKey, "minute", fromString, currentString).then(
        (response) => {
          const newList = data.filter((elem) => {
            return true;
          });
          // console.log(response);
          const addedList = response.result?.map((elem, index) => {
            const timeStr = elem.localDate
              ? elem.localDate
              : elem.localDateTime;
            return {
              // x: elem.localDate ? elem.localDate : elem.localDateTime,
              x: timeStrToTimestamp(timeStr),
              y: [
                elem.openPrice,
                elem.highPrice,
                elem.lowPrice,
                elem.closePrice
                  ? elem.closePrice
                  : Number.parseInt(elem.currentPrice),
              ],
            };
            // return elem.closePrice;
          });
          newList.push(...addedList);
          setData(newList);
          // console.log(newList);
          setUpdateData(false);
        }
      );
    }
  }, [updateData]);

  // useEffect(() => {
  //   if (noContent === true && mode === "day") {
  //     console.log("No content");
  //     setNoContent(false);
  //     const str = getPrevDateStrings(prevDateCnt);
  //     console.log(str);

  //     fetchStockPrice(stockKey, "minute", str[0], str[1])
  //       .then((response) => {
  //         console.log(response);
  //         return response.result;
  //       })
  //       .then((result) => {
  //         console.log(result);
  //         if (result.length > 0) {
  //           setData(result);
  //         } else {
  //           setPrevDateCnt(prevDateCnt + 1);
  //           setNoContent(true);
  //         }
  //       });
  //   }
  // }, [noContent, prevDateCnt]);

  const timeStrToTimestamp = useCallback((str) => {
    const year = str.slice(0, 4);
    const month = str.slice(4, 6);
    const day = str.slice(6, 8);
    if (str.length > 11) {
      const hour = str.slice(8, 10);
      const min = str.slice(10, 12);

      // console.log(year, month, day, hour, min);
      return new Date(year, month, day, hour, min);
    } else {
      // console.log(year, month, day);
      return new Date(year, month, day);
    }
  }, []);

  useEffect(() => {
    if (mode === "day" && data.length > 0) {
      // console.log(price);
      let len = data.length;

      data[len - 1].y[3] = price;

      setData(
        data.filter((elem) => {
          return true;
        })
      );
      // console.log(data[len - 1]);
    }
  }, [price]);

  const getFromDate = useCallback(
    (now) => {
      const fromDate = new Date(now);
      let interval = "minute";

      if (mode === "day") {
        fromDate.setHours(9);
        fromDate.setMinutes(0);
        fromDate.setSeconds(0);
        fromDate.setMilliseconds(0);
      } else if (mode === "week") {
        fromDate.setMonth(fromDate.getMonth() - 1);
        interval = "day";
      } else if (mode === "3month") {
        fromDate.setMonth(fromDate.getMonth() - 3);
        interval = "week";
      } else if (mode === "year") {
        fromDate.setFullYear(fromDate.getFullYear() - 1);
        interval = "week";
      }

      return { interval, fromDate };
    },
    [mode]
  );

  const getTimeString = useCallback((now) => {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}${month}${day}${hours}${minutes}`;
  }, []);

  return data?.length > 0 ? (
    <ApexChart
      type={chartType}
      series={[
        {
          data: data,
        },
      ]}
      options={{
        theme: {
          mode: "light",
        },
        chart: {
          height: 350,
          type: { chartType },
        },
        xaxis: {
          tooltip: {
            enabled: true,
            formatter: function (value, timestamp) {
              return new Date(value).toISOString().split(".")[0];
            },
          },
          type: "datetime",
          labels: {
            show: false,
          },
        },
        yaxis: {
          tooltip: {
            enabled: false,
            formatter: function (value, val1) {
              console.log(value, val1);
            },
          },
          labels: {
            show: true,
            formatter: function (value) {
              return value.toFixed(0);
            },
          },
        },
        // dataLabels: {
        //   enabled: true,
        // },
        plotOptions: {
          candlestick: {
            colors: {
              downward: "#375aff",
              upward: "#F44336",
            },
          },
        },
      }}
    />
  ) : (
    <div style={{ height: "262px" }}></div>
  );
}
