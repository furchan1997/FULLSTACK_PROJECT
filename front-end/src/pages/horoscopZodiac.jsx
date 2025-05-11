import { useEffect, useState } from "react";
import { useContent } from "../context/contents.context";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Btn from "../components/btn";
import PageHeaders from "../components/common/pageHeaders";
import HoroscopsContent from "../components/horoscopsContent";
import { useAuth } from "../context/auth.context";
import HoroscopsCard from "../components/horoscopCard";
// הצגת הורוסקפים לפי מזל
function HoroscopZodiac() {
  const {
    error,
    loading,
    horoscops,
    likeHoroscop,
    fetchToLike,
    searchResult,
    handleSearchResult,
  } = useContent();
  const { user } = useAuth();
  const { sign } = useParams();
  const navigate = useNavigate();

  const handleLikeClick = async (ID) => {
    await likeHoroscop(ID);
    await fetchToLike(); // טוען מחדש את הלייקים
    handleSearchResult(); // מעדכן את תוצאות החיפוש
  };
  const handleHoroscop = async (ID) => {
    if (!ID) {
      alert(`ERROR: ${error}`); // אם אין מזהה, מציג שגיאה
    }
    navigate(`/horoscops/${ID}`); // מעביר לדף ההורוסקופ הספציפי
  };

  const filteredHoroscop = horoscops.filter((h) => h.sign === sign);

  if (filteredHoroscop.length === 0) {
    return <div>אין ההורוסקופים כרגע...</div>;
  }

  if (loading) {
    return (
      <div className="rtl">
        <p>טוען...</p> {/* מציג הודעת טעינה אם הנתונים נטענים */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rtl">
        <p>שגיאה: {error}</p> {/* מציג שגיאה אם ישנה בעיה */}
      </div>
    );
  }

  return (
    <div className="horoscop-page-image">
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {filteredHoroscop.map((horoscop, id) => (
            <div key={id} className="col-md-4 col-sm-12">
              <HoroscopsCard
                sign={horoscop?.sign}
                title={horoscop?.title}
                likes={horoscop?.likes?.length ?? 0}
                goToHoroscop={() => handleHoroscop(horoscop?._id)}
                toggleLikeBuUser={() => handleLikeClick(horoscop?._id)}
                isLiked={horoscop?.likes?.includes(user?.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HoroscopZodiac;
