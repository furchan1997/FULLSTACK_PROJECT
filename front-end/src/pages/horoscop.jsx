import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import HoroscopsContent from "../components/horoscopsContent";
import { useAuth } from "../context/auth.context";
import { useContent } from "../context/contents.context";
import Logo from "../components/logo";
import { signs } from "../components/common/HoroscopeFltered";
// עמוד הצגת הורוסקופ מורכב ויחיד

function Horoscop() {
  const { id } = useParams(); // מקבל את ה-ID מה-URL
  const navigate = useNavigate(); // מאפשר ניווט בין דפים
  const { user } = useAuth(); // מביא את המידע על המשתמש המחובר
  const {
    getHoroscop,
    error,
    loading,
    horoscop,
    likeHoroscop,
    fetchToLike,
    deleteHoroscop,
  } = useContent(); // מביא את הפונקציות והמידע מהקונטקסט של התוכן

  // פונקציה שמטפלת בלחיצה על לייק
  const handleLikeClick = async (ID) => {
    await likeHoroscop(ID); // מוסיף או מסיר לייק
    await fetchToLike(); // מרענן את רשימת הלייקים
    await getHoroscop(id); // טוען מחדש את ההורוסקופ אחרי שינוי בלייקים
  };

  useEffect(() => {
    fetchToLike(); // טוען את רשימת הלייקים בעת טעינת הקומפוננטה
  }, []);

  useEffect(() => {
    getHoroscop(id); // טוען את הנתונים של ההורוסקופ עם שינוי ה-ID
  }, [id]);

  // פונקציה שמעבירה לדף הראשי של ההורוסקופים
  const handleMainHoroscops = () => {
    navigate(`/horoscop-page/${horoscop?.sign}`);
  };

  // פונקציה שמובילה לעמוד עריכת ההורוסקופ
  const handleClickToUpdateHoroscop = () => {
    navigate(`/admin/update-horoscop/${id}`);
  };

  // פונקציה שמוחקת הורוסקופ לאחר אישור המשתמש
  const handleClickDeleteHoroscop = async (ID) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your content? This action cannot be undone."
    );
    if (!isConfirmed) return;
    await deleteHoroscop(ID); // מוחק את ההורוסקופ
    navigate("/horoscop-page"); // מעביר חזרה לעמוד הראשי לאחר מחיקה
  };

  // אם יש שגיאה, מציג התראה ומעביר לדף הראשי של ההורוסקופים
  useEffect(() => {
    if (error) {
      alert(`ERROR: ${error}`);
      navigate("/horoscop-page");
    }
  }, [error]);

  // אם הנתונים עדיין נטענים, מציג הודעה זמנית
  if (loading) return <p className="rtl">טוען...</p>;
  {
    /* מציג הודעת טעינה */
  }
  return (
    <>
      <div className="container">
        {horoscop && Object.keys(horoscop).length > 0 ? (
          <div key={horoscop?.id} className="border-1 p-2 my-4">
            <HoroscopsContent
              key={id}
              sign={horoscop?.sign}
              title={horoscop?.title}
              subtitle={horoscop?.subtitle}
              description={horoscop?.description}
              likes={horoscop?.likes?.length ?? 0} // בודק אם יש לייקים ומחזיר 0 אם אין
              image={horoscop?.image}
              horoscopPage
              backToMainPage={handleMainHoroscops}
              updateHoroscopPage={handleClickToUpdateHoroscop}
              deleteHoroscop={() => handleClickDeleteHoroscop(horoscop?._id)}
              toggleLikeBuUser={() => handleLikeClick(horoscop?._id)}
              isLiked={horoscop?.likes?.includes(user?.id)} // בודק אם המשתמש הנוכחי עשה לייק
            />
          </div>
        ) : (
          <p>No horoscope found</p> // אם לא נמצא הורוסקופ תואם
        )}
      </div>
    </>
  );
}

export default Horoscop;
