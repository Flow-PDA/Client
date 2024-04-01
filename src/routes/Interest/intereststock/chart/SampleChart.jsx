import React, { useCallback, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { fetchStockPrice } from "../../../../lib/apis/stock";

export default function SampleChart({ mode, stockKey, price }) {
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
          return {
            x: elem.localDate ? elem.localDate : elem.localDateTime,
            y: [
              elem.openPrice,
              elem.highPrice,
              elem.lowPrice,
              elem.closePrice ? elem.closePrice : elem.currentPrice,
            ],
          };
          // return elem.closePrice;
        });
        console.log(newList);
        setData(newList);
        // console.log(newList[1].x - newList[0].x);
        setChartInterval(newList[1].x - newList[0].x);
        setChartInterval(100);
      } else {
        // setNoContent(true);
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
          console.log(response);
          const addedList = response.result?.map((elem, index) => {
            return {
              x: elem.localDate ? elem.localDate : elem.localDateTime,
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
          console.log(newList);
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

  const getPrevDateStrings = useCallback((cnt) => {
    const date = new Date(Date.now() - cnt * 1000 * 3600 * 24);
    const from = new Date(date);
    const end = new Date(date);

    from.setHours(7);
    end.setHours(16);

    const fromString = getTimeString(from);
    const endString = getTimeString(end);

    return [fromString, endString];
  }, []);

  const getFromDate = useCallback(
    (now) => {
      const fromDate = new Date(now);
      let interval = "minute";

      if (mode === "day") {
        fromDate.setHours(9);
        fromDate.setMinutes(0);
        fromDate.setSeconds(0);
        fromDate.setMilliseconds(0);
      } else if (mode === "month") {
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
        colors: ["#FF0000"],
        xaxis: {
          tooltip: {
            enabled: true,
          },
          type: mode === "day" ? "date" : "date",
          labels: {
            show: false,
          },
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
          labels: {
            show: false,
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
        tooltip: {
          shared: false,
          y: {
            formatter: function (value) {
              console.log(value);
              return value;
            },
          },
        },
        // annotations: {
        //   // 예시로 선을 추가합니다. 여기에 원하는 어노테이션을 추가할 수 있습니다.
        //   yaxis: [
        //     {
        //       x: data[0]?.x,
        //       strokeDashArray: 0,
        //       borderColor: "#775DD0",
        //       label: {
        //         borderColor: "#775DD0",
        //         style: {
        //           color: "#fff",
        //           background: "#775DD0",
        //         },
        //         text: data[0].y[0],
        //       },
        //     },
        //   ],
        // },
      }}
    />
  ) : (
    <></>
  );
}
