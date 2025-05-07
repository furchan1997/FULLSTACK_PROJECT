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
          ? "container rtl card shadow-lg border p-3 my-4"
          : "container rtl card shadow-lg border p-4 my-4"
      }
    >
      <div className="card-body">
        <div className="text-center mb-4">
          <h1 className="fw-bold fs-3">{sign}</h1>
        </div>
        <div className="text-center mb-4">
          <h1 className="fw-bold fs-3">{title}</h1>
        </div>

        <div className="mb-3 text-center">
          <h3>{subtitle}</h3>
        </div>

        {horoscopPage && (
          <>
            <div className="mb-3 text-center">
              <h3 className="text-muted fs-5">{description}</h3>
            </div>
          </>
        )}

        <div className="mb-3 text-center">
          <img
            className="img-fluid rounded"
            style={{
              maxHeight: horoscopPage ? "500px" : "300px",
              objectFit: "contain",
            }}
            src={url}
            alt={alt}
          />
        </div>

        <div className="mb-3 text-center">
          <h3>
            לייקים: <span className="text-danger">{likes}</span>
          </h3>
        </div>

        {!horoscopPage && (
          <div className="d-flex justify-content-center mb-3">
            <Btn
              description={"הצג"}
              className={
                "custom-bg-gold custom-gold-color col-6 col-md-3 text-center"
              }
              type={"submit"}
              fn={goToHoroscop}
            />
          </div>
        )}

        <div className="d-flex justify-content-center mb-4">
          <Btn
            description={
              isLiked ? (
                <span className="liked-icon fs-5">❤️</span>
              ) : (
                <span className="unliked-icon fs-5">🤍</span>
              )
            }
            type={"submit"}
            fn={toggleLikeBuUser}
          />
        </div>

        {horoscopPage && (
          <div className="row g-2 justify-content-center">
            <div className="col-12 col-sm-6 col-md-4">
              <Btn
                fn={backToMainPage}
                description={"חזרה"}
                className={"custom-bg-purple custom-gold-color w-100"}
                type={"submit"}
              />
            </div>

            {user.isAdmin && (
              <>
                <div className="col-12 col-sm-6 col-md-4">
                  <Btn
                    fn={updateHoroscopPage}
                    description={"עדכן"}
                    className={"custom-bg-purple custom-gold-color w-100"}
                    type={"submit"}
                  />
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                  <Btn
                    fn={deleteHoroscop}
                    description={"מחק"}
                    className={"custom-bg-purple custom-gold-color w-100"}
                    type={"submit"}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HoroscopsContent;
