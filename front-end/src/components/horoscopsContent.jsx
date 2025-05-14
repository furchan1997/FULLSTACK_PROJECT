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
      className={`container rtl my-5 fw-bold book-frame color-my-services-text`}
    >
      <div className="p-4">
        <div className="card-body">
          <div className="text-center mb-3">
            <h1>{sign}</h1>
            <hr className="my-4 border border-1 border-dark opacity-25" />

            <h2 className="fs-2 custom-purple-color">{title}</h2>
            <h5 className="fw-bold fs-4">{subtitle}</h5>
          </div>

          <hr className="my-4 border border-1 border-dark opacity-25" />

          {horoscopPage && (
            <>
              <p className="text-center fs-5 px-md-5">{description}</p>
              <hr className="my-4 border border-1 border-dark opacity-25" />
            </>
          )}

          <div className="text-center mb-3">
            <h5>
              לייקים: <span className="fw-bold">{likes}</span>
            </h5>
          </div>

          <hr className="my-4 border border-1 border-dark opacity-25" />

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

          <div className="d-flex justify-content-center mb-4 ">
            <div className="d-flex justify-content-center mb-4">
              <Btn
                type="submit"
                className="custom-bg-purple custom-gold-color"
                description={isLiked ? "❤️" : "🤍"}
                onClick={toggleLikeBuUser}
              />
            </div>
          </div>

          {horoscopPage && (
            <div className="row g-3 justify-content-center">
              <div className="col-12 col-sm-6 col-md-4">
                <Btn
                  fn={backToMainPage}
                  description={"חזרה"}
                  className="w-100 custom-gold-color custom-bg-purple fs-5"
                  type="button"
                />
              </div>

              {user.isAdmin && (
                <>
                  <div className="col-12 col-sm-6 col-md-4">
                    <Btn
                      fn={updateHoroscopPage}
                      description={"עדכני"}
                      className="w-100 custom-gold-color custom-bg-purple fs-5"
                      type="button"
                    />
                  </div>
                  <div className="col-12 col-sm-6 col-md-4">
                    <Btn
                      fn={deleteHoroscop}
                      description={"מחקי"}
                      className="w-100 custom-gold-color custom-bg-purple fs-5"
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
