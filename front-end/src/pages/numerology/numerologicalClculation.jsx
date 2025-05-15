import { useEffect, useState } from "react";
import Btn from "../../components/btn";
import Input from "../../components/input";
import { useAuth } from "../../context/auth.context";

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
    setResult(sumDigit());
  };

  useEffect(() => {
    dayPicker();
    monthPicker();
    yearsPicker();
  }, []);

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
          <p className="fw-bold fs-5">
            {!result ? (
              !selectedDay || !selectedMonth || !selectedYear ? (
                "בחר/י יום, חודש ושנה"
              ) : (
                "לחץ/י על כפתור החישוב"
              )
            ) : (
              <>
                היי {userDetalis?.firstName}, מספר הגורל שלך הינו: {result} וזה
                אומר כך: <br /> Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Excepturi atque repudiandae, veniam recusandae
                quis corporis? Minima placeat sunt, ea quae atque debitis. Sint
                maiores earum neque deserunt delectus similique quidem? Suscipit
                minus omnis inventore assumenda laboriosam facilis dolor
                perspiciatis? Ut nobis exercitationem illum fugit, autem nulla
                rem reprehenderit, consectetur vitae in sint tempore tempora
                enim dolor laboriosam ipsa nisi sed? Ea culpa, repudiandae
                inventore veniam, distinctio placeat recusandae quo tempora
                delectus similique reprehenderit. Eum at voluptatem reiciendis
                possimus ea, commodi voluptas sed beatae est illo molestias
                pariatur dicta. Ex, vitae?
                <br />
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NumerologicalCalculation;
