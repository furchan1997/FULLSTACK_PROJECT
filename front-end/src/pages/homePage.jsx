import PageHeaders from "../components/common/pageHeaders";
import Logo from "../components/logo";

// רכיב דף הבית , מוצג כאן תיאור על מנהלת האתר ומה האתר ומנהלת מציעים לקהל

function HomePage() {
  return (
    <div className="container text-center my-5 rtl">
      <PageHeaders
        title={
          <>
            ברוכים הבאים לבלוג ההורוסקופים של עדן בן אור
            <Logo colorClass={"custom-gold-color"} />
          </>
        }
      />
      <div className="container py-4">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src="../../LOGOS/mystic.png"
            alt="mystic-logo"
            className="img-fluid rounded shadow-sm"
            style={{ maxWidth: "90%", height: "50vh" }}
          />
        </div>
      </div>
      <div className="home-page-for-tablets card shadow-lg p-2 custom-bg-purple text-end ">
        <ul className="list-unstyled fs-5 ">
          <li>
            🔮{" "}
            <strong className="custom-gold-color">
              תחזיות אסטרולוגיות יומיות ושבועיות
            </strong>
          </li>
          <li>
            ⭐{" "}
            <strong className="custom-gold-color">
              מידע מקיף על 12 המזלות
            </strong>
          </li>
          <li>
            📌{" "}
            <strong className="custom-gold-color">
              אפשרות לסמן לייק ולשמור תחזיות אהובות במועדפים
            </strong>
          </li>
          <li>
            👤{" "}
            <strong className="custom-gold-color">
              גישה מלאה למשתמשים רשומים בלבד!
            </strong>
          </li>
        </ul>

        <div
          className="custom-bg-gold fs-5 text-center"
          style={{ borderRadius: "20px" }}
        >
          ✨{" "}
          <strong className="custom-purple-color">
            הצטרפו עכשיו וקבלו גישה להורוסקופים מותאמים אישית!
          </strong>
        </div>

        <h5 className="mt-4 text-center custom-gold-color">
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
  );
}

export default HomePage;
