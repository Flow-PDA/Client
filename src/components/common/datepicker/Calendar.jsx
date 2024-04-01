import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { getMonth, getYear, getDate } from "date-fns";
import dayjs from "dayjs";
import "./CalendarCustom.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import * as _ from "lodash";
registerLocale("ko", ko);

const CustomInput = React.forwardRef((props, ref) => {
  return (
    <div
      className="calendar-input-wrap"
      style={{
        width: "85vw",
        borderTop: "none",
        borderRight: "none",
        borderLeft: "none",
        paddingBottom: "0.5rem",
      }}
    >
      <input {...props} ref={ref} type="text" />
      <CalendarMonthIcon />
    </div>
  );
});

export default function CalendarCustomFour({ handleEndDataChange }) {
  const [startDate, setStartDate] = useState(
    new Date(
      `${getMonth(new Date()) + 1}-${getDate(new Date()) + 1}-${getYear(
        new Date()
      )}`
    )
  );
  const [endDate, setEndDate] = useState(new Date());
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1);

  registerLocale("ko", ko);

  const years = _.range(getYear(new Date()), getYear(new Date()) + 10, 1);
  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const selectStartDate = dayjs(startDate).format("YYYY-MM-DD");
  const selectEndDate = dayjs(endDate).format("YYYY-MM-DD");

  const handleClickYear = (year) => {
    const endYears = new Date(
      `${getMonth(new Date()) + 1}-${getDate(new Date())}-${
        getYear(new Date()) + year
      }`
    );
    setEndDate(endYears);
    handleEndDataChange(endYears);
  };

  // const handleClickMonth = (month) => {
  //   const endYears = new Date(
  //     `${getMonth(new Date()) + 1 + month}-${getDate(new Date())}-${getYear(
  //       new Date()
  //     )}`
  //   );
  //   setEndDate(endYears);
  // };
  const handleClickMonth = (month) => {
    let newMonth = getMonth(startDate) + 1 + month;
    let newYear = getYear(startDate);

    if (newMonth > 12) {
      newMonth -= 12;
      newYear += 1;
    }

    const endYears = new Date(`${newMonth}-${getDate(startDate)}-${newYear}`);
    setEndDate(endYears);
    handleEndDataChange(endYears);
  };

  const handleClick = (hoverIndex, index) => {
    setSelectedButtonIndex(hoverIndex);
    handleClickMonth(index);
  };
  const handleYear = (hoverIndex, index) => {
    setSelectedButtonIndex(hoverIndex);
    handleClickYear(index);
  };

  return (
    <div className="custom-wrap3 custom-wrap4">
      <div className="date-picker-wrap">
        <DatePicker
          customInput={
            <CustomInput style={{ width: "100%", color: "#888888" }} />
          }
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
                // backgroundColor: "#000",
              }}
            >
              <button
                style={{ border: "none", backgroundColor: "#fff" }}
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <ArrowBackIosIcon />
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(Number(value))}
                className="selectbox"
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}년
                  </option>
                ))}
              </select>
              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
                className="selectbox"
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}월
                  </option>
                ))}
              </select>
              <button
                style={{ border: "none", backgroundColor: "#fff" }}
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <ArrowForwardIosIcon />
              </button>
            </div>
          )}
          dayClassName={(d) => "custom-day"}
          dateFormat="yyyy.MM.dd"
          disabledKeyboardNavigation
          locale="ko"
          maxDate={
            new Date(
              `${getMonth(new Date()) + 1}-${getDate(new Date())}-${
                getYear(new Date()) + 10
              }`
            )
          }
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            handleEndDataChange(date);
          }}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>
      <div className="input-container">
        <p
          className={`input-start-date ${
            selectedButtonIndex === 0 ? "selected" : ""
          }`}
          onClick={() => handleClick(0, 1)}
        >
          1개월
        </p>
        <p
          className={`input-start-date ${
            selectedButtonIndex === 1 ? "selected" : ""
          }`}
          onClick={() => handleClick(1, 2)}
        >
          2개월
        </p>
        <p
          className={`input-start-date ${
            selectedButtonIndex === 2 ? "selected" : ""
          }`}
          onClick={() => handleClick(2, 3)}
        >
          3개월
        </p>
        <p
          className={`input-start-date ${
            selectedButtonIndex === 3 ? "selected" : ""
          }`}
          onClick={() => handleClick(3, 6)}
        >
          6개월
        </p>
        <p
          className={`input-start-date ${
            selectedButtonIndex === 4 ? "selected" : ""
          }`}
          onClick={() => handleYear(4, 1)}
        >
          1년
        </p>
        <p
          className={`input-start-date ${
            selectedButtonIndex === 5 ? "selected" : ""
          }`}
          onClick={() => handleYear(5, 2)}
        >
          2년
        </p>
        <p
          className={`input-start-date ${
            selectedButtonIndex === 6 ? "selected" : ""
          }`}
          onClick={() => handleYear(6, 3)}
        >
          3년
        </p>
        <p
          className={`input-start-date ${
            selectedButtonIndex === 7 ? "selected" : ""
          }`}
          onClick={() => handleYear(7, 5)}
        >
          5년
        </p>
        <p
          className={`input-start-date ${
            selectedButtonIndex === 8 ? "selected" : ""
          }`}
          onClick={() => handleYear(8, 10)}
        >
          10년
        </p>
      </div>
    </div>
  );
}
