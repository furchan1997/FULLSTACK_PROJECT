import Logo from "./logo";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useEffect, useState } from "react";
import { useContent } from "../context/contents.context";

function NavBar() {
  const { user, logOut, userDetalis } = useAuth();
  const { handleSearchResult, horoscops } = useContent();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const handleSearchHoroscop = () => {
    // החזרת מערך חדש ומסונן על ידי הערכים של המפתות הקיימים באובייקט של הורוסקופ

    const horoscopsResult = horoscops.filter((horoscop) =>
      ["sign", "title", "subtitle", "description"].some((key) =>
        horoscop[key]?.toLowerCase().includes(searchTerm?.toLowerCase())
      )
    );

    handleSearchResult(horoscopsResult); // עדכון תוצאות החיפוש
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearchHoroscop(); // עדכון החיפוש כשמשתמש מקליד
    }
  }, [searchTerm]); // עדכון החיפוש ברגע שהמשתמש מקליד

  useEffect(() => {
    setSearchTerm("");
  }, [location]);
  // פונקציה עבור ניתוק משתמש מהמערכת
  const hanleLogOut = () => {
    logOut();
  };

  return (
    <nav className="navbar navbar-expand-lg custom-bg-purple navbar-dark">
      <div className="container-fluid">
        <div>
          <NavLink className={"logo-container logo"} to="/">
            <Logo color="white" />
          </NavLink>
        </div>

        {/*  כפתור המבורגר */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample02"
          aria-controls="navbarsExample02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 🔹 שדה החיפוש */}

        {/* <form role="search" onSubmit={(ev) => ev.preventDefault()}>
          <input
            className="form-control"
            type="search"
            placeholder="חפש הורוסקופים"
            aria-label="Search"
            value={searchTerm}
            onChange={(ev) => setSearchTerm(ev.target.value)}
          />
        </form> */}
        {/* הצגת קישורים עבור מנהל בלבד */}
        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav me-auto">
            {user?.isAdmin ? (
              <li className="nav-item">
                <span className="nav-link custom-gold-color">שלום, Admin!</span>
              </li>
            ) : (
              userDetalis?.firstName && (
                <li className="nav-item">
                  <span className="nav-link custom-gold-color">
                    Hello, {userDetalis?.firstName}
                  </span>
                </li>
              )
            )}
            <NavLink className="nav-link custom-gold-color mx-3" to="/">
              דף הבית
            </NavLink>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle custom-gold-color"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                מזלות
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <NavLink className="dropdown-item" to="/zodiacs-signs">
                    מזלות כלליים
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/horoscop-page">
                    הורוסקופ
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-gold-color" to="/My-services">
                השירותים שלי
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link custom-gold-color" to="/shop">
                חנות
              </NavLink>
            </li>

            {user && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link custom-gold-color"
                    to="/numerological-calculation"
                  >
                    חישוב נומורולוגי
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {/* הצגת קישורים עבור משתמש מחובר ועבור משתמש שאינו מחובר */}
          <ul className="navbar-nav ms-auto">
            {user && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link custom-gold-color"
                    to={`/my-account/${user?.id}`}
                  >
                    החשבון שלי
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link custom-gold-color"
                    to={`/favorite/${user?.id}`}
                  >
                    מועדפים
                  </NavLink>
                </li>
                {user?.isAdmin && (
                  <li className="nav-item">
                    <NavLink className="nav-link custom-gold-color" to="/admin">
                      Admin Panel
                    </NavLink>
                  </li>
                )}
              </>
            )}
            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link custom-gold-color" to="/sign-in">
                    התחברות
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link custom-gold-color" to="/sign-up">
                    הרשמה
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link custom-gold-color"
                    to="/"
                    onClick={hanleLogOut}
                  >
                    יציאה
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
