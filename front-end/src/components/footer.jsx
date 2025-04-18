import { NavLink } from "react-router-dom";
import Logo from "./logo";
// רכיב פוטר שבו מוצג קישור למעבר אל תקנון ואודות האתר + אמצעי התקשות אל מנהלת האתר ברשתות החברתיות + כל הזכיות שמורות
function Footer() {
  return (
    <footer className="custom-bg-purple p-3">
      <div className="d-flex flex-wrap justify-content-around align-items-center gap-3 text-center">
        <p className="m-0 footer">
          © {new Date().getFullYear()} All rights reserved - Mystic site{" "}
          <Logo />
        </p>

        <div className="d-flex gap-3">
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

        <div className="d-flex gap-3">
          <NavLink to={"/about"} className="footer">
            אודות
          </NavLink>
          <NavLink to={"/regulations"} className="footer">
            תקנון אתר
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
