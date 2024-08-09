import { useState } from "react";
import BirthdayForm from "./components/BirthdayForm";
import Result from "./components/Result";

function App() {
  const [days, setDays] = useState(0);
  const [months, setMonths] = useState(0);
  const [years, setYears] = useState(0);

  const setInfo = (days, months, years) => {
    setDays(days);
    setMonths(months);
    setYears(years);
  };
  return (
    <>
      <h2>Age Calculator</h2>
      <main>
        <BirthdayForm setInfo={setInfo} />
        <Result days={days} months={months} years={years} />
      </main>
    </>
  );
}

export default App;
