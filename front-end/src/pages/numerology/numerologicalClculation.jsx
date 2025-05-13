import { useState } from "react";
import Btn from "../../components/btn";
import Input from "../../components/input";

function NumerologicalCalculation() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);

  const sumDigit = (date) => {
    const [year, month, day] = date.split("-");
    const allDigits = year + month + day;

    let sum = allDigits
      .split("")
      .map(Number)
      .reduce((acc, curr) => acc + curr, 0);

    while (sum > 9 && sum !== 11 && sum !== 22) {
      sum = sum
        .toString()
        .split("")
        .map(Number)
        .reduce((acc, curr) => acc + curr, 0);
    }

    return sum;
  };

  const handleClickResult = () => {
    const calculatedResult = sumDigit(date);
    setResult(calculatedResult);
    console.log(result);
  };

  return (
    <div className="container numerological-page rtl my-1 text-white p-5">
      <h2 className="text-center">חישוב נומורולוגי</h2>

      {/* שינוי כאן: direction לפי גודל מסך */}
      <div className="d-flex flex-column flex-md-row gap-3">
        {/* טופס */}
        <div className="d-flex flex-wrap gap-3 w-100 w-md-50 fw-bold">
          <Input label={"שם פרטי"} type={"text"} />
          <Input label={"שם משפחה"} type={"text"} />
          <Input
            label={"תאריך לידה"}
            type={"date"}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Btn
            type={"button"}
            className="custom-bg-gold custom-purple-color w-50 fw-bold"
            description={"חשב/י"}
            onClick={handleClickResult}
          />
        </div>

        {/* תוצאה */}
        <div className="d-flex w-100 w-md-50 justify-content-center">
          <p className="m-0 fw-bold">
            {result !== null && !Number.isNaN(result) ? (
              <>
                התוצאה היא:
                <br />
                {result}
              </>
            ) : result !== null && Number.isNaN(result) ? (
              <>הינך חייב למלא את התאריך</>
            ) : (
              <>הנך מוזמן/ת לחשב את מספר הגורל שלך</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NumerologicalCalculation;
