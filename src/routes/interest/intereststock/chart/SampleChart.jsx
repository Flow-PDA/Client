import React, { useCallback, useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { fetchStockPrice } from '../../../../lib/apis/stock';

export default function SampleChart({ mode, stockKey }) {
  
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState("line");

  useEffect(() => {
    async function fetchData() {
      const currentDate = new Date();
      const fromDate = new Date(currentDate);
      fromDate.setDate(currentDate.getDate() - 50);
      
      const currentTimeStr = getTimeString(currentDate);
      const fromTimeStr = getTimeString(fromDate);
  
      console.log(currentTimeStr, fromTimeStr);
  
      const response = await fetchStockPrice(stockKey, "day", fromTimeStr, currentTimeStr);
      
      const newList = response.result?.map((elem) => {
        return {
          x: elem.localDate,
          y: [elem.openPrice, elem.highPrice, elem.lowPrice, elem.closePrice]
        }
      });
      console.log(newList);
      setData(newList);
    }
    if (mode === "day") setChartType("candlestick")
    else setChartType("line");
    fetchData();
  }, [mode, stockKey]);

  const getTimeString = useCallback((now) => {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}`;
  }, [])

  return (
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
          type: {chartType},
        },
        colors: ['#FF0000'],
        // title: {
        //   text: "주식 차트",
        //   align: "left",
        // },
        xaxis: {
          tooltip: {
            enabled: true,
          },
          type: "date",
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
              day: "dd MMM",
              hour: "HH:mm",
            },
          },
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
          labels: {
            formatter: function (value) {
              return value.toFixed(0);
            },
          },
        },
        plotOptions: {
          candlestick: {
            colors: {
              downward: "#375aff",
              upward: "#F44336",
            },
          },
        },
        annotations: {
          // 예시로 선을 추가합니다. 여기에 원하는 어노테이션을 추가할 수 있습니다.
          xaxis: [
            {
              x: data[15]?.x,
              strokeDashArray: 0,
              borderColor: "#775DD0",
              label: {
                borderColor: "#775DD0",
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
                text: "어노테이션",
              },
            },
          ],
        },
      }}
    />
  );
}
