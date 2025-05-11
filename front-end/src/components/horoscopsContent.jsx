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
    <div className={`container rtl my-5 fw-bold`}>
      <div className="card mystic-card p-4">
        <div className="card-body">
          <div className="text-center mb-3">
            <h1 className="display-5 fw-bold text-light">{sign}</h1>
            <h2 className="h4 text-warning">{title}</h2>
            <h5 className="text-light">{subtitle}</h5>
          </div>

          {horoscopPage && (
            <p className="text-center text-light fs-5 px-md-5">{description}</p>
          )}

          <div className="text-center mb-4">
            <img
              src={url}
              alt={alt}
              className="img-fluid rounded-4 shadow"
              style={{
                maxHeight: horoscopPage ? "450px" : "300px",
                objectFit: "cover",
              }}
            />
          </div>

          <div className="text-center mb-3">
            <h5 className="text-light">
              לייקים: <span className="text-danger fw-bold">{likes}</span>
            </h5>
          </div>

          {!horoscopPage && (
            <div className="d-flex justify-content-center mb-3">
              <Btn
                description={"הצג"}
                className="mystic-button w-50 "
                type="button"
                fn={goToHoroscop}
              />
            </div>
          )}

          <div className="d-flex justify-content-center mb-4">
            <button
              onClick={toggleLikeBuUser}
              className={`btn btn-lg ${
                isLiked ? "btn-danger" : "btn-outline-danger"
              } rounded-circle like-button`}
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
          </div>

          {horoscopPage && (
            <div className="row g-3 justify-content-center">
              <div className="col-12 col-sm-6 col-md-4">
                <Btn
                  fn={backToMainPage}
                  description={"חזרה"}
                  className="mystic-button w-100 color-for-horoscop"
                  type="button"
                />
              </div>

              {user.isAdmin && (
                <>
                  <div className="col-12 col-sm-6 col-md-4">
                    <Btn
                      fn={updateHoroscopPage}
                      description={"עדכן"}
                      className="mystic-button w-100 color-for-horoscop"
                      type="button"
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4">
                    <Btn
                      fn={deleteHoroscop}
                      description={"מחק"}
                      className="btn btn-outline-danger w-100 fw-bold"
                      type="button"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HoroscopsContent;
