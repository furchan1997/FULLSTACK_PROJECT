import { useEffect, useState } from "react";
import { useAuth } from "../context/auth.context";
import { useContent } from "../context/contents.context";
import { useLocation, useNavigate } from "react-router-dom";
import Btn from "../components/btn";
import HoroscopsContent from "../components/horoscopsContent";
import PageHeaders from "../components/common/pageHeaders";
import Logo from "../components/logo";

function Horoscops() {
  const { user } = useAuth(); // מקבל מידע על המשתמש מהקונטקסט
  const {
    error,
    loading,
    horoscops,
    likeHoroscop,
    fetchToLike,
    searchResult,
    handleSearchResult,
  } = useContent(); // מקבל מידע ופונקציות מהקונטקסט של התוכן

  const [filterdHoroscop, setFilterdHoroscop] = useState(horoscops); // ניהול מצב לתחזוקת רשימת ההורוסקופים המסוננת
  const location = useLocation(); // ניטור שינויי כתובת
  const navigate = useNavigate(); // מאפשר ניווט לדפים שונים

  const handleSignIn = () => {
    navigate("/sign-in"); // מעביר לדף ההתחברות
  };

  const handleLikeClick = async (ID) => {
    await likeHoroscop(ID);
    await fetchToLike(); // טוען מחדש את הלייקים
    handleSearchResult(); // מעדכן את תוצאות החיפוש
  };

  useEffect(() => {
    // מעדכן את רשימת ההורוסקופים המסוננת בהתאם לתוצאות החיפוש
    setFilterdHoroscop(searchResult?.length > 0 ? searchResult : horoscops);
  }, [searchResult, horoscops]);

  const handleHoroscop = async (ID) => {
    if (!ID) {
      alert(`ERROR: ${error}`); // אם אין מזהה, מציג שגיאה
    }
    navigate(`/horoscops/${ID}`); // מעביר לדף ההורוסקופ הספציפי
  };

  useEffect(() => {
    // מנקה את תוצאות החיפוש כאשר המשתמש משנה מיקום בדף
    handleSearchResult([]);
  }, [location]);

  if (loading) {
    return <div>loading...</div>; // מציג הודעת טעינה אם הנתונים נטענים
  }

  if (!user) {
    return (
      <>
        <div className="container">
          <p>for special content you need to sign-in</p>
          <Btn
            type={"submit"}
            className="custom-bg-gold custom-purple-color"
            description={"click"}
            fn={handleSignIn} // כפתור שמוביל לדף ההתחברות
          />
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // מציג שגיאה אם ישנה בעיה
  }

  if (horoscops?.length === 0) {
    return <p>No Horoscops yet...</p>; // אם אין הורוסקופים להצגה
  }

  return (
    <>
      <PageHeaders
        title={
          <>
            {"Weekly horoscope"} <Logo />
          </>
        }
        description={"Here is a weekly horoscope for all zodiac signs."}
      />
      <div className="container">
        <div className="row my-5 gap-3 m-auto">
          {filterdHoroscop.map((horoscop, id) => (
            <div key={id} className="col-12">
              <div className="card shadow-lg border-1 d-flex flex-column">
                <HoroscopsContent
                  sign={horoscop?.sign}
                  description={horoscop?.title}
                  image={horoscop?.image}
                  likes={horoscop?.likes?.length}
                  goToHoroscop={() => handleHoroscop(horoscop?._id)}
                  horoscopPages
                  toggleLikeBuUser={() => handleLikeClick(horoscop?._id)}
                  isLiked={horoscop?.likes?.includes(user?.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Horoscops;
