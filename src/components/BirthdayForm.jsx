import React, { useEffect, useState } from "react";
import img from "../assets/images/icon-arrow.svg";

const BirthdayForm = ({ setInfo }) => {
  const today = new Date();
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");
  const [formIsValid, setFormIsValid] = useState(true);

  useEffect(() => {
    // Clear previous errors
    setDayError("");
    setMonthError("");
    setYearError("");
    // Validate day
    if (!day) {
      setDayError("This field is required");
    } else if (day < 1 || day > 31) {
      setDayError("Must be a valid day");
    }

    // Validate month
    if (!month) {
      setMonthError("This field is required");
    } else if (month < 1 || month > 12) {
      setMonthError("Must be a valid month");
    }

    // Validate year
    if (!year) {
      setYearError("This field is required");
    } else if (year > today.getFullYear()) {
      setYearError("Must be in the past");
    }

    // Validate if the combination of day, month, and year forms a valid date
    if (!dayError && !monthError && !yearError) {
      const isValidDate = (day, month, year) => {
        // Check for leap year
        const isLeapYear = (year) => {
          return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        };

        if (month === 2) {
          // February
          if (isLeapYear(year)) {
            if (day > 29) return false;
          } else {
            if (day > 28) return false;
          }
        } else if ([4, 6, 9, 11].includes(month)) {
          // April, June, September, November
          if (day > 30) return false;
        }

        // Create a date object with the given year, month, and day
        const testDate = new Date(year, month - 1, day); // month is zero-based
        // Check if the date object matches the input
        return (
          testDate.getFullYear() === year &&
          testDate.getMonth() === month - 1 && // getMonth() is zero-based
          testDate.getDate() === day
        );
      };

      if (!isValidDate(day, month, year)) {
        setDayError("Must be a valid date");
      }
    }
  }, [day, month, year]);

  useEffect(() => {
    setFormIsValid(!(dayError || yearError || monthError));
  }, [dayError, monthError, yearError]);

  const getInfo = () => {
    const birthDate = new Date(`${month}/${day}/${year}`);
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative months or days
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    // Adjust for negative days
    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    // Adjust if months became negative after day adjustment
    if (months < 0) {
      years--;
      months += 12;
    }

    setInfo(days, months, years);
  };

  return (
    <>
      <form className="app-form">
        <div className="form-group">
          <label htmlFor="day" className={dayError ? "error-label" : ""}>
            Day
          </label>
          <input
            id="day"
            type="number"
            name="day"
            min={1}
            max={31}
            value={day ?? ""}
            className={dayError ? "error-input" : ""}
            onChange={(e) => setDay(e.target.value)}
          />
          <span className="error-message">{dayError}</span>
        </div>
        <div className="form-group">
          <label htmlFor="month" className={monthError ? "error-label" : ""}>
            Month
          </label>
          <input
            id="month"
            type="number"
            name="month"
            min={1}
            max={12}
            value={month ?? ""}
            className={monthError ? "error-input" : ""}
            onChange={(e) => setMonth(e.target.value)}
          />
          <span className="error-message">{monthError}</span>
        </div>
        <div className="form-group">
          <label htmlFor="year" className={yearError ? "error-label" : ""}>
            Year
          </label>
          <input
            id="year"
            type="number"
            name="year"
            value={year ?? ""}
            className={yearError ? "error-input" : ""}
            onChange={(e) => setYear(e.target.value)}
          />
          <span className="error-message">{yearError}</span>
        </div>
      </form>

      <div className="separator">
        <span className="line"></span>
        <button
          className="btn"
          onClick={getInfo}
          disabled={!formIsValid}
          onKeyDown={(e) => e.key === "Enter" && getInfo()}
        >
          <img src={img} alt="button" />
        </button>
      </div>
    </>
  );
};

export default BirthdayForm;
