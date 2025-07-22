import { useAuth } from "../context/auth.context";
import Btn from "./btn";

// רכיב כרטיס שבו מוצג הורוסקופ מתומצת
function HoroscopsCard({
  sign,
  title,
  likes,
  goToHoroscop = () => {},
  toggleLikeBuUser = () => {},
  isLiked,
}) {
  return (
    <div className="horoscop-card fw-bold text-break">
      <p className="text-center fs-4 fs-md-2">{sign}</p>
      <p className="text-center fs-6 fs-md-4">{title}</p>
      <p className="text-center">לייקים: {likes}</p>

      <div className="d-flex justify-content-around align-items-center flex-wrap gap-2 mt-3">
        <Btn
          description={"הצג"}
          className="custom-bg-gold custom-gold-color"
          type="submit"
          fn={goToHoroscop}
        />
        <Btn
          description={
            isLiked ? (
              <span className="liked-icon fs-5" aria-label="מועדף">
                ❤️
              </span>
            ) : (
              <span className="unliked-icon fs-5" aria-label="לא מועדף">
                🤍
              </span>
            )
          }
          type="submit"
          fn={toggleLikeBuUser}
        />
      </div>
    </div>
  );
}

export default HoroscopsCard;
