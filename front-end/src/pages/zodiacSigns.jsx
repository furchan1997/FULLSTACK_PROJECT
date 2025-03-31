import Logo from "../components/logo";
import PageHeaders from "../components/common/pageHeaders";
import { useEffect, useState } from "react";
import { getAllContents } from "../services/contentService";
import Content from "../components/content";

// רכיב של מידע על מזלות באופן כללי , הרכיב מוצג לכל אחד באפליקציה בין אם זה אורח משתמש מחובר או מנהל

function ZodiacsSigns() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSign, setSelectedSign] = useState(""); // סטייט עבור סינון מזלות עם אלמנט הסלקט

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllContents();
        const data = response.data;

        if (!data) {
          throw new Error("No data received from server.");
        }

        setContent(data);
      } catch (err) {
        setError(
          err?.response?.data?.message || err.message || "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // מערך של סוגי המזלות לצורך קבלת אותו המזל אל רכיב תוכן ועבור סינון של המזלות לפי פרמטר שהוא שם המזל

  const zodiacSigns = [
    "aquarius",
    "pisces",
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius",
    "capricorn",
  ];

  // הצגת כל המזלות או מזל ספציפי לפי שם המזל
  const filterdContent = selectedSign
    ? { [selectedSign]: content[selectedSign] }
    : content;

  if (error) {
    return <div>{`There is a error: ${error}`}</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }

  if (content.length === 0) {
    return <p>No content available.</p>;
  }

  return (
    <>
      <PageHeaders
        title={
          <>
            {"ZODIACS"} <Logo />{" "}
          </>
        }
        description={"A general introduction to zodiac signs and mysticism"}
      />
      {/*selectedSign הקוד מאפשר למשתמש לבחור מזל מתוך רשימה נפתחת, כאשר הבחירה מתעדכנת במשתנה */}
      <select
        value={selectedSign}
        onChange={(e) => setSelectedSign(e.target.value)}
        className="form-select form-select-lg text-center border-warning text-warning w-50 m-auto custom-bg-purple"
      >
        <option value="">בחר מזל</option>
        {zodiacSigns.map((sign) => (
          <option key={sign} value={sign}>
            {/*  מבצע המרה של האות הראשונה לאות גדולה (למקרה שהשמות במערך באותיות קטנות). */}
            {sign.charAt(0).toUpperCase() + sign.slice(1)}
          </option>
        ))}
      </select>

      {Object.keys(filterdContent).map((zodiac) => {
        return (
          <Content
            key={zodiac}
            zodiac={content[zodiac].sign}
            basicContent={content[zodiac].basicContent}
            howYouThinkAndTalk={content[zodiac].howYouThinkAndTalk}
            locationOnMap={content[zodiac].locationOnMap}
            whoYouAre={content[zodiac].whoYouAre}
          />
        );
      })}
    </>
  );
}

export default ZodiacsSigns;
