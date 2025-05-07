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

  const backgroundImages = {
    aries: "aries.jpg",
    gemini: "gemini.jpg",
    aquarius: "aquarius.jpg",
    pisces: "pisces.jpg",
    taurus: "taureus.jpg",
    capricorn: "capricorn.png",
    cancer: "cancer.png",
    leo: "leo.jpg",
    virgo: "virgo.png",
    libra: "libra.png",
    scorpio: "scorpion.png",
    sagittarius: "sagittarius.png",
  };
  console.log(backgroundImages);

  // הצגת כל המזלות או מזל ספציפי לפי שם המזל
  const filterdContent = selectedSign
    ? { [selectedSign]: content[selectedSign] }
    : content;
  console.log(filterdContent);

  const contentArray = Object.entries(content).map(([key, value]) => ({
    zodiacKey: key, // לדוגמה: "aries"
    ...value, // כל המידע הפנימי
  }));

  console.log(contentArray);
  if (error) {
    return (
      <div className="rtl">
        <p>{`שגיאה: ${error}`}</p> {/* מציג הודעת שגיאה */}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rtl">
        <p>טוען...</p> {/* מציג הודעת טעינה */}
      </div>
    );
  }

  if (content.length === 0) {
    return (
      <div className="rtl">
        <p>אין תוכן זמין.</p> {/* מציג הודעה אם אין תוכן */}
      </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-column gap-2">
        <select
          value={selectedSign}
          onChange={(e) => setSelectedSign(e.target.value)}
          className="form-select form-select-lg text-center border-warning w-50 m-auto custom-bg-gold custom-gold-color "
        >
          <option value="">בחר מזל</option>
          {contentArray.map((sign) => (
            <option key={sign.zodiacKey} value={sign.zodiacKey}>
              {sign.sign}
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
              backgroundImages={backgroundImages[zodiac]}
            />
          );
        })}
      </div>
    </>
  );
}

export default ZodiacsSigns;
