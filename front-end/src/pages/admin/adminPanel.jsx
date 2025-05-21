import { useNavigate } from "react-router-dom";
import Btn from "../../components/btn";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import logerService from "../../services/logerService";
// הרכיב הבא הינו עבור מנהל בלבד שבו יוצגו כפתורים וקישורים אל פעולות מנהל כמו ניהול משתמשים ויצירת הורוסקופ חדש
// חשוב לציין שעריכה ומחיקה של הורוסקופים לא נמצא כאן אלא נמצא בעמוד הורוסקופ
function AdminPanel() {
  const [loginLoger, setLoginLoger] = useState("");
  const navigate = useNavigate();

  const handleClick = (route) => {
    navigate(route);
  };

  useEffect(() => {
    const fatch = async () => {
      try {
        const dataLog = await logerService.loginLoger();
        console.log(dataLog);
        setLoginLoger(dataLog);
      } catch (err) {
        console.log(err);
      }
    };
    fatch();
  }, []);

  const logLines = loginLoger.split("\n").filter((line) => line.trim() !== "");
  const logObjects = logLines.map((line) => {
    const parts = line.trim().split(/\s+/);

    return {
      firstName: parts[0],
      lastName: parts[1],
      IP: parts[2],
      date: parts[3],
    };
  });

  console.log(logObjects);
  // console.log(separationParts);

  return (
    <div className="container d-flex flex-column gap-3 align-items-center rtl">
      <h3 className="text-center mt-3">שלום אדמין!</h3>

      <div className="d-flex gap-1 flex-wrap">
        <Btn
          description={"כל המשתמשים"}
          className={"custom-bg-gold"}
          type={"submit"}
          fn={() => handleClick("/admin/users")}
        />
        <Btn
          description={"צרי הורוסקופ חדש"}
          className={"custom-bg-gold"}
          type={"submit"}
          fn={() => handleClick("/admin/create-horoscop")}
        />

        <Btn
          description={"צפי בהודעות מהלקוחות"}
          className={"custom-bg-gold"}
          type={"submit"}
          fn={() => handleClick("/admin/inbox")}
        />
        <Btn
          description={"צרי מוצר חדש"}
          className={"custom-bg-gold"}
          type={"submit"}
          fn={() => handleClick("/admin/create-product")}
        />
      </div>

      <div>
        <h2 className="fs-2 fw-bold">מתשמשים מחוברים</h2>

        {logObjects.map((log) => (
          <ul key={`${log.IP}-${log.date}`}>
            <li className="fs-2">{log.firstName}</li>
            <li className="fs-2">{log.lastName}</li>
            <li style={{ color: "gray" }}>{log.IP}</li>
            <li>{log.date}</li>
            <li>{new Date().getFullYear()}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
