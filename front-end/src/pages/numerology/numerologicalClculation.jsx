import { useEffect, useState } from "react";
import Btn from "../../components/btn";
import { numerologyNum } from "../numerology/numerologyNums.js";
import { useAuth } from "../../context/auth.context";
import NumerologyNum from "../../components/numerologyNum";

function NumerologicalCalculation() {
  const [days, setDays] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [result, setResult] = useState(null);
  const { userDetalis } = useAuth();

  const dayPicker = () => {
    let dayArr = [];
    for (let i = 1; i <= 31; i++) {
      dayArr.push(i);
    }
    setDays(dayArr);
  };

  const monthPicker = () => {
    let monthArr = [];
    for (let i = 1; i <= 12; i++) {
      monthArr.push(i);
    }
    setMonths(monthArr);
  };

  const yearsPicker = () => {
    let yearsArr = [];
    for (let i = 1940; i <= 2025; i++) {
      yearsArr.push(i);
    }
    yearsArr.sort((a, b) => b - a);
    setYears(yearsArr);
  };

  const sumDigit = () => {
    const allDigit = selectedDay + selectedMonth + selectedYear;

    let sum = allDigit
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

  const handleDateResult = () => {
    setResult(String(sumDigit()));
  };

  useEffect(() => {
    dayPicker();
    monthPicker();
    yearsPicker();
  }, []);

  const fixTexts = (text = "") => {
    return text
      .replace(/\(/g, "TEMP_OPEN")
      .replace(/\)/g, "(")
      .replace(/TEMP_OPEN/g, ")");
  };

  const fixedData = result &&
    numerologyNum[result] && {
      description: fixTexts(numerologyNum[result].description),
      positiveDescription:
        numerologyNum[result].positiveDescription.map(fixTexts),
      negativeDesription:
        numerologyNum[result].negativeDesription.map(fixTexts),
      womanDestiption: fixTexts(numerologyNum[result].womanDestiption),
      menDecription: fixTexts(numerologyNum[result].menDecription),
      relationshipsAPartnershipsDes: fixTexts(
        numerologyNum[result].relationshipsAPartnershipsDes
      ),
      whyShouldDate: fixTexts(numerologyNum[result].whyShouldDate),
      whyNoShouldDate: fixTexts(numerologyNum[result].whyNoShouldDate),
      workAcareer: fixTexts(numerologyNum[result].workAcareer),
    };

  return (
    <div className="backround-numerological-calculation-page rtl text-white p-4">
      <h2 className="text-center mb-4 fw-bold">חישוב נומרולוגי - מספר גורל</h2>

      <div className="d-flex flex-column flex-md-row gap-5">
        {/* הבחירות בצד שמאל */}
        <div className="d-flex flex-column gap-3 w-50 w-lg-50">
          <select
            name="day"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="form-select"
          >
            <option disabled value="">
              יום
            </option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            name="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="form-select"
          >
            <option disabled value="">
              חודש
            </option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            name="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="form-select"
          >
            <option disabled value="">
              שנה
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <Btn
            type={"button"}
            disabled={!selectedDay || !selectedMonth || !selectedYear}
            className="custom-bg-gold custom-purple-color w-100 fw-bold"
            description={"חשב/י"}
            onClick={handleDateResult}
          />
        </div>

        {/* תוצאה בצד שמאל */}
        <div className="d-flex w-100">
          <h3 className="fw-bold fs-5">
            {!result ? (
              !selectedDay || !selectedMonth || !selectedYear ? (
                "בחר/י יום, חודש ושנה"
              ) : (
                "לחץ/י על כפתור החישוב"
              )
            ) : (
              <>
                <span id="numerological-hello-user">
                  {" "}
                  היי {userDetalis?.firstName}, מספר הגורל שלך הינו: {result}
                </span>
                {
                  <NumerologyNum
                    number={result}
                    description={fixedData?.description}
                    positiveDescription={fixedData?.positiveDescription}
                    negativeDesription={fixedData?.negativeDesription}
                    womanDestiption={fixedData?.womanDestiption}
                    menDecription={fixedData?.menDecription}
                    relationshipsAPartnershipsDes={
                      fixedData?.relationshipsAPartnershipsDes
                    }
                    whyShouldDate={fixedData?.whyShouldDate}
                    whyNoShouldDate={fixedData?.whyNoShouldDate}
                    workAcareer={fixedData?.workAcareer}
                  />
                }
              </>
            )}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default NumerologicalCalculation;
