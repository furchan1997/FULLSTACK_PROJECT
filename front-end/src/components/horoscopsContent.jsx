// הרכיב הבא מציג מידע אודות סימן גלגל המזלות בצורה דינמית ומותאמת למצב שבו הוא נמצא
// לדף הראשי, הוא מאפשר למשתמש לבצע פעולות שונות כמו צפייה בפרטים, סימון "לייק", חזרה
//  עדכון ומחיקה אם הוא משתמש עם הרשאות אדמין.
import { useAuth } from "../context/auth.context";
import Btn from "./btn";

function HoroscopsContent({
  sign,
  title,
  subtitle,
  description,
  image: { alt, url },
  likes,
  goToHoroscop = () => {},
  backToMainPage = () => {},
  updateHoroscopPage = () => {},
  deleteHoroscop = () => {},
  toggleLikeBuUser = () => {},
  horoscopPage = false,
  isLiked,
}) {
  const { user } = useAuth();

  return (
    <div
      className={
        horoscopPage
          ? "container rtl card shadow-lg border-1 p-1"
          : "container rtl card shadow-lg border-1 p-4"
      }
    >
      <div className="row text-center mb-4">
        <div className="col">
          <h1 className="font-weight-bold fs-3">{sign}</h1>
        </div>
      </div>

      {horoscopPage && (
        <>
          <div className="row mb-3">
            <div className="col">
              <h2 className="font-weight-bold fs-3">{title}</h2>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <h3>{subtitle}</h3>
            </div>
          </div>
        </>
      )}
      <div className="row mb-3">
        <div className="col">
          <h3>{description}</h3>
        </div>
      </div>
      <div>
        <img
          style={
            horoscopPage
              ? {
                  width: "100%", // תמונה תתממש לרוחב כל הקונטיינר
                  maxHeight: "500px", // גובה יתאים באופן אוטומטי ליחס רוחב/גובה של התמונה
                  objectFit: "contain", // שמור על יחס פרופורציות
                }
              : {
                  width: "100%", // גם כאן
                  maxHeight: "300px", // גם כאן
                  objectFit: "contain", // שמור על יחס פרופורציות
                }
          }
          src={url}
          alt={alt}
        />
      </div>

      <div className="row mb-3">
        <div className="col">
          <h3>Likes: {likes}</h3>
        </div>
      </div>

      {/* כפתור Show בתוך ה-box */}
      {!horoscopPage && (
        <Btn
          description={"Show"}
          className={"custom-bg-gold custom-gold-color col-3 col-xs-6 m-auto"}
          type={"submit"}
          fn={goToHoroscop}
        />
      )}

      {/* כפתור לייק בתוך ה-box */}
      <Btn
        description={
          isLiked ? (
            <span className="liked-icon fs-5">❤️</span>
          ) : (
            <span className="unliked-icon fs-5">🤍</span>
          )
        }
        type={"submit"}
        // className={horoscopPage && "w-50"}
        fn={toggleLikeBuUser}
      />

      {horoscopPage && (
        <>
          <Btn
            fn={backToMainPage}
            description={"Back"}
            className={
              "custom-bg-purple custom-gold-color col-12 col-sm-6 col-md-4"
            }
            type={"submit"}
          />
          {user.isAdmin && (
            <>
              <Btn
                fn={user.isAdmin ? updateHoroscopPage : undefined}
                description={"Update"}
                className={
                  "custom-bg-purple custom-gold-color col-12 col-sm-6 col-md-4"
                }
                type={"submit"}
              />
              <Btn
                fn={user.isAdmin ? deleteHoroscop : undefined}
                description={"Delete"}
                className={
                  "custom-bg-purple custom-gold-color col-12 col-sm-6 col-md-4"
                }
                type={"submit"}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default HoroscopsContent;
