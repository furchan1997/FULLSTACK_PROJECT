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
  const { user } = useAuth();
  return (
    <div className="horoscop-card fw-bold">
      <p className="text-center fs-2">{sign}</p>
      <p className="text-center fs-4"> {title}</p>
      <p>לייקים: {likes}</p>

      <div className="d-flex justify-content-around align-items-center">
        {" "}
        <Btn
          description={"הצג"}
          className={"custom-bg-gold custom-gold-color"}
          type={"submit"}
          fn={goToHoroscop}
        />
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
    </div>
  );
}

export default HoroscopsCard;
