import { useNavigate } from "react-router-dom";
import Btn from "../../components/btn";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
// הרכיב הבא הינו עבור מנהל בלבד שבו יוצגו כפתורים וקישורים אל פעולות מנהל כמו ניהול משתמשים ויצירת הורוסקופ חדש
// חשוב לציין שעריכה ומחיקה של הורוסקופים לא נמצא כאן אלא נמצא בעמוד הורוסקופ
function AdminPanel() {
  const navigate = useNavigate();

  const [msgCount, setMsgCount] = useState(0);
  const [displayAlert, setDisplayAlert] = useState(false);

  useEffect(() => {
    const fetchInitialMsgCount = async () => {
      try {
        const { data } = await userService.msgAlert();
        setMsgCount(data.count); // אתחול
      } catch (err) {
        console.log(err);
      }
    };
    fetchInitialMsgCount();
  }, []);
  useEffect(() => {
    const intervalAlert = setInterval(async () => {
      try {
        const { data } = await userService.msgAlert();
        if (data.count > msgCount) {
          setDisplayAlert(true); // הודעה חדשה
          setMsgCount(data.count); // עדכון הספירה
        }
      } catch (err) {
        console.log(err);
      }
    }, 10000); // נניח כל 10 שניות

    return () => clearInterval(intervalAlert);
  }, [msgCount]);

  const handleClick = (route) => {
    navigate(route);
  };
  console.log("from react", msgCount);
  return (
    <div className="container" dir="rtl">
      <h3>שלום אדמין!</h3>

      <div className="d-flex gap-1 flex-wrap">
        <Btn
          description={"כל המשתמשים"}
          className={"custom-bg-gold"}
          type={"submit"}
          fn={() => handleClick("/admin/users")}
        />
        <Btn
          description={"צור הורוסקופ חדש"}
          className={"custom-bg-gold"}
          type={"submit"}
          fn={() => handleClick("/admin/create-horoscop")}
        />

        <Btn
          description={"צפה בהודעות מהלקוחות"}
          className={"custom-bg-gold"}
          type={"submit"}
          fn={() => handleClick("/admin/inbox")}
        />

        {displayAlert ? (
          <div className="alert alert-info">🔔 יש הודעה חדשה מלקוח!</div>
        ) : (
          <div className="alert alert-info">אין הודעות חדשות בינתיים</div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
