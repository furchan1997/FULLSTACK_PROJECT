import { useParams, useNavigate } from "react-router-dom";
import PageHeaders from "../components/common/pageHeaders";
import { useEffect, useState } from "react";
import HoroscopsContent from "../components/horoscopsContent";
import { useAuth } from "../context/auth.context";
import { useContent } from "../context/contents.context";
import Logo from "../components/logo";

function Favorite() {
  // קבלת הנתונים והפונקציות הדרושות מהקונטקסטים
  const { error, loading, favorites, likeHoroscop, fetchToLike, getHoroscops } =
    useContent();
  const { user, logOut } = useAuth();
  const { id } = useParams(); // קבלת ה-ID מה-URL
  const { sign } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // אם ה-ID מה-URL שונה מזה של המשתמש המחובר, מפנה למסך ההתחברות ומבצע התנתקות
    if (id !== user?.id) {
      navigate("/sign-in");
      logOut();
      return;
    }
  }, [navigate, user?.id]);

  // פונקציה לניווט לדף ההורוסקופ המתאים
  const handleHoroscop = (ID) => {
    navigate(`/horoscops/${sign}/${ID}`); // מעביר לדף ההורוסקופ הספציפי
    // if (!ID) {
    //   navigate("/");
    // }
  };

  // פונקציה להסרת לייק מהורוסקופ ורענון רשימת המועדפים
  const handkeUnLikeClick = async (ID) => {
    await likeHoroscop(ID);
    await fetchToLike();
    await getHoroscops();
  };

  // טעינת המועדפים כשהרכיב נטען לראשונה
  useEffect(() => {
    getHoroscops();
    fetchToLike();
  }, []);

  // הצגת הודעת טעינה אם הנתונים עדיין נטענים
  if (loading) {
    return (
      <div className="rtl">
        <p>טוען...</p>
      </div>
    );
  }

  // הצגת הודעת שגיאה אם אירעה שגיאה
  if (error) {
    return (
      <div className="rtl">
        <div>שגיאה: {error}</div>
      </div>
    );
  }

  // אם אין מועדפים, מציג הודעה מתאימה
  if (favorites.length === 0) {
    return (
      <div className="rtl">
        <div>אין מועדפים עדיין...</div>
      </div>
    );
  }

  return (
    <>
      {/* כותרת העמוד */}
      <PageHeaders
        title={
          <>
            עמוד מועדפים <Logo />
          </>
        }
        description={
          "כאן תוכל לשמור את התוכן המועדף עליך. חלק מהתוכן עשוי להיות נערך מחדש או נמחק על ידי מנהל האתר."
        }
      />
      <div className="container">
        <div className="row my-5 gap-3 m-auto">
          {favorites.map((f) => (
            <div key={f._id} className="col-12">
              <div className="d-flex flex-column">
                {/* רכיב לתצוגת פרטי הורוסקופ */}
                <HoroscopsContent
                  sign={f.sign}
                  title={f.title}
                  description={f.subtitle}
                  subtitle={f.description}
                  image={f.image}
                  likes={f.likes.length}
                  toggleLikeBuUser={() => {
                    handkeUnLikeClick(f?._id);
                  }}
                  isLiked={true}
                  goToHoroscop={() => {
                    handleHoroscop(f?._id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Favorite;
