import PageHeaders from "../components/common/pageHeaders";
import Logo from "../components/logo";
import { Navigate, useNavigate, useParams } from "react-router-dom";

// רכיב דף הבית , מוצג כאן תיאור על מנהלת האתר ומה האתר ומנהלת מציעים לקהל

function HomePage() {
  const navigate = useNavigate(); // מאפשר ניווט בין דפים
  const handleToSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <div className="main-image">
      <div className="container text-center my-5 rtl">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center"></div>
        </div>
        <h1 className="text-center custom-purple-color">
          {" "}
          <span className="signature">Edenque</span>
        </h1>
        <div className="book-frame home-page-for-tablets p-2 text-end">
          <h1 className="d-flex justify-content-center align-items-center custom-purple-color officle-font-header">
            ברוכים הבאים לאתר שלי
          </h1>
          <ul className="list-unstyled fs-5 officle-font">
            <li>
              🔮{" "}
              <strong className="custom-purple-color">
                תחזיות אסטרולוגיות יומיות ושבועיות
              </strong>
            </li>
            <li>
              ⭐{" "}
              <strong className="custom-purple-color">
                מידע מקיף על 12 המזלות
              </strong>
            </li>
            <li>
              📌{" "}
              <strong className="custom-purple-color">
                אפשרות לסמן לייק ולשמור תחזיות אהובות במועדפים
              </strong>
            </li>
            <li>
              👤{" "}
              <strong className="custom-purple-color">
                גישה מלאה למשתמשים רשומים בלבד!
              </strong>
            </li>
          </ul>

          <div
            className="custom-bg-gold fs-5 text-center"
            style={{ borderRadius: "20px" }}
          >
            ✨{" "}
            <strong className="custom-purple-color" onClick={handleToSignUp}>
              <span className="cursor-pointer">
                הצטרפו עכשיו וקבלו גישה להורוסקופים מותאמים אישית!
              </span>
            </strong>
          </div>

          <h5 className="mt-4 text-center custom-purple-color">
            📲 עקבו אחרי עדן בן אור גם ברשתות החברתיות:
          </h5>

          <div className="d-flex justify-content-center gap-3 mt-3">
            <a
              href="https://www.instagram.com/edenique28/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-icon"
                src="./LOGOS/instagram.png"
                alt="instagram-logo"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCmksBdgKZxmg4akEo97C9kA/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-icon"
                src="./LOGOS/youtube.png"
                alt="youtube-logo"
              />
            </a>
            <a
              href="https://www.tiktok.com/@edeniquee"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="social-icon"
                src="./LOGOS/tiktok.png"
                alt="tiktok-logo"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
