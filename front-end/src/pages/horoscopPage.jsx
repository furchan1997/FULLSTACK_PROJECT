import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { useContent } from "../context/contents.context";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Btn from "../components/btn";
import PageHeaders from "../components/common/pageHeaders";
import { signs } from "../components/common/HoroscopeFltered";
// עמוד בחירת מזל ומעבר אל ההורוסקופים שלו
function HoroscopPage() {
  const { user } = useAuth(); // מקבל מידע על המשתמש מהקונטקסט
  const { error, loading, zodiacSigns, getSigns } = useContent(); // מקבל מידע ופונקציות מהקונטקסט של התוכן

  useEffect(() => {
    getSigns();
  }, []);

  const navigate = useNavigate(); // מאפשר ניווט לדפים שונים

  const handleSignIn = () => {
    navigate("/sign-in"); // מעביר לדף ההתחברות
  };

  // const { sign } = useParams();

  if (loading) {
    return (
      <div className="rtl">
        <p>טוען...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="container rtl">
          <p>הרשמ/י עוד היום וקבל מלא תכנים מתקדמים בחינם !</p>
          <Btn
            type={"submit"}
            className="custom-bg-purple custom-gold-color"
            description={"הרשמ/י"}
            fn={handleSignIn} // כפתור שמוביל לדף ההתחברות
          />
        </div>
      </>
    );
  }

  if (error) {
    return <div>שגיאה: {error}</div>; // מציג שגיאה אם ישנה בעיה
  }

  return (
    <div className="book-frame" data-page="zodiacs">
      <div className="zodiacs-grid">
        {zodiacSigns.map((sign) => (
          <div
            key={sign}
            className="item"
            onClick={() => navigate(`/horoscop-page/${sign}`)}
          >
            {sign}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HoroscopPage;
