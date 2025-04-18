import { useNavigate } from "react-router-dom";
import Btn from "../../components/btn";
// הרכיב הבא הינו עבור מנהל בלבד שבו יוצגו כפתורים וקישורים אל פעולות מנהל כמו ניהול משתמשים ויצירת הורוסקופ חדש
// חשוב לציין שעריכה ומחיקה של הורוסקופים לא נמצא כאן אלא נמצא בעמוד הורוסקופ
function AdminPanel() {
  const navigate = useNavigate();

  const handleToAllUsers = () => {
    navigate("/admin/users");
  };
  const handleToCreateHoroscop = () => {
    navigate("/admin/create-horoscop");
  };

  return (
    <div className="container">
      <h3>HELLO ADMIN !</h3>

      <div className="d-flex gap-1">
        <Btn
          description={"all users"}
          className={"custom-bg-gold "}
          type={"submit"}
          fn={handleToAllUsers}
        />
        <Btn
          description={"Create New Horoscop"}
          className={"custom-bg-gold "}
          type={"submit"}
          fn={handleToCreateHoroscop}
        />
      </div>
    </div>
  );
}

export default AdminPanel;
