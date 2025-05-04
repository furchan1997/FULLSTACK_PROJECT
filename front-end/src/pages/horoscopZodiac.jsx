import { useEffect, useState } from "react";
import { useContent } from "../context/contents.context";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Btn from "../components/btn";
import PageHeaders from "../components/common/pageHeaders";
import HoroscopsContent from "../components/horoscopsContent";
import { useAuth } from "../context/auth.context";
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
    return <div>loading...</div>; // מציג הודעת טעינה אם הנתונים נטענים
  }

  if (error) {
    return <div>Error: {error}</div>; // מציג שגיאה אם ישנה בעיה
  }

  return (
    <div className="container">
      <div className="row my-5 gap-3 m-auto">
        {filteredHoroscop.map((horoscop, id) => (
          <div key={id} className="col-12">
            <div className="card shadow-lg border-1 d-flex flex-column">
              <HoroscopsContent
                key={id}
                sign={horoscop?.sign}
                title={horoscop?.title}
                subtitle={horoscop?.subtitle}
                likes={horoscop?.likes?.length ?? 0} // בודק אם יש לייקים ומחזיר 0 אם אין
                image={horoscop?.image}
                goToHoroscop={() => handleHoroscop(horoscop?._id)}
                toggleLikeBuUser={() => handleLikeClick(horoscop?._id)}
                isLiked={horoscop?.likes?.includes(user?.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HoroscopZodiac;
