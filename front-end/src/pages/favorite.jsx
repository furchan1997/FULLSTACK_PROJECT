import { useParams, useNavigate } from "react-router-dom";
import PageHeaders from "../components/common/pageHeaders";
import { useEffect, useState } from "react";
import HoroscopsContent from "../components/horoscopsContent";
import { useAuth } from "../context/auth.context";
import { useContent } from "../context/contents.context";
import Logo from "../components/logo";

function Favorite() {
  // קבלת הנתונים והפונקציות הדרושות מהקונטקסטים
  const { error, loading, favorites, likeHoroscop, fetchToLike } = useContent();
  const { user, logOut } = useAuth();
  const { id } = useParams(); // קבלת ה-ID מה-URL
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
    navigate(`/horoscops/${ID}`);
  };

  // פונקציה להסרת לייק מהורוסקופ ורענון רשימת המועדפים
  const handkeUnLikeClick = async (ID) => {
    await likeHoroscop(ID);
    await fetchToLike();
  };

  // טעינת המועדפים כשהרכיב נטען לראשונה
  useEffect(() => {
    fetchToLike();
  }, []);

  // הצגת הודעת טעינה אם הנתונים עדיין נטענים
  if (loading) {
    return (
      <>
        <p>loading</p>
      </>
    );
  }

  // הצגת הודעת שגיאה אם אירעה שגיאה
  if (error) {
    return <div>ERROR: {error}</div>;
  }

  // אם אין מועדפים, מציג הודעה מתאימה
  if (favorites.length === 0) {
    return <div>No favorites yet...</div>;
  }

  return (
    <>
      {/* כותרת העמוד */}
      <PageHeaders
        title={
          <>
            Favorite page <Logo />
          </>
        }
        description={
          "Here you can save your favorite content. Some of the content may be re-edited or deleted by the site administrator."
        }
      />
      <div className="container">
        <div className="row my-5 gap-3 m-auto">
          {favorites.map((f) => (
            <div key={id} className="col-12">
              <div className="card shadow-lg border-1 d-flex flex-column">
                {/* רכיב לתצוגת פרטי הורוסקופ */}
                <HoroscopsContent
                  key={f._id}
                  sign={f.sign}
                  title={f.title}
                  description={f.subtitle}
                  subtitle={f.description}
                  image={f.image}
                  likes={f.likes.length}
                  toggleLikeBuUser={() => {
                    handkeUnLikeClick(f._id);
                  }}
                  isLiked={true}
                  goToHoroscop={() => {
                    handleHoroscop(f._id);
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
