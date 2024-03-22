import React from "react";
import ApexChart from "react-apexcharts";

export default function SampleChart() {
  // 주식 가격 데이터 생성
  const generateStockData = () => {
    const data = [];
    const numberOfDataPoints = 30; // 데이터 포인트 개수

    let basePrice = 100; // 기준 가격

    for (let i = 1; i <= numberOfDataPoints; i++) {
      // 주가 랜덤하게 생성
      const open = basePrice + Math.random() * 10 - 5;
      const high = open + Math.random() * 5;
      const low = open - Math.random() * 5;
      const close = low + Math.random() * (high - low);
      const date = new Date();
      date.setDate(date.getDate() - (numberOfDataPoints - i)); // 오늘부터 과거로 거슬러 올라감

      data.push({
        x: date.toISOString(),
        y: [open, high, low, close],
      });

      basePrice = close; // 다음 기준 가격은 이전 종가로 설정
    }

    return data;
  };

  const data = generateStockData(); // 주식 데이터 생성

  return (
    <ApexChart
      type="candlestick"
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
          type: "candlestick",
        },
        // title: {
        //   text: "주식 차트",
        //   align: "left",
        // },
        xaxis: {
          tooltip: {
            enabled: true,
          },
          type: "datetime",
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
              x: data[15].x,
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
