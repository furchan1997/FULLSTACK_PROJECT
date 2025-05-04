import { useNavigate } from "react-router-dom";

function MyServices() {
  const navigate = useNavigate();

  const handleClike = (serviceType) => {
    navigate(serviceType);
  };

  return (
    <div
      data-page="my-services"
      className="container book-frame d-flex flex-column align-items-center rtl"
    >
      <h1>✨ עדניק – הכוונה רוחנית מדויקת מהלב ✨</h1>
      <h2>טארוט | נומרולוגיה | אסטרולוגיה | ניקוי אנרגטי | פיתוח אישי</h2>

      <p>
        <strong>ברוכה הבאה ♥</strong> <br />
        אני עדן בן אור, מתקשרת, פותחת בקלפים, יועצת רוחנית ומלווה נשים וגברים
        במסע לגילוי עצמי, קבלת החלטות והגשמה אישית. השליחות שלי היא לעזור לך
        להתחבר לעצמך, להבין את המסר שבמצב שבו את נמצאת – ולמצוא את הדרך לשחרור,
        צמיחה ושפע.
      </p>

      <p>
        מאז ילדותי אני חשה חיבור עמוק לעולמות הרוח. בעזרת כלים כמו טארוט,
        אסטרולוגיה, נומרולוגיה, פירוש מסרים וניקוי אנרגטי – אני מציעה תהליכים
        אישיים שמחברים אותך למי שאת באמת.
      </p>

      <h3>💬 באיזה שלב את נמצאת? בחרי את הדרך שמתאימה לך עכשיו:</h3>
      <p>
        🔮 עזרה מיידית | פתיחה בקלפים קיבלת מסרים סותרים? מרגישה בלבול מול קשר
        או סיטואציה מסוימת? הקלפים שלי יעזרו לך לראות בבירור את התמונה – להבין
        מה עובר על הצד השני, מה חוסם אותך, ומה הצעד הנכון הבא.
      </p>
      <div
        className="custom-bg-gold fs-5 text-center p-2"
        style={{ borderRadius: "20px" }}
      >
        <strong className="custom-purple-color">
          <span
            onClick={() => handleClike("/My-services/openin-cards")}
            className="cursor-pointer"
          >
            קראי עוד על פתיחה בקלפים ›
          </span>
        </strong>
      </div>

      <div className="my-3">
        <h3>🌠 פיתוח אישי | אסטרולוגיה ונומרולוגיה</h3>
        <p>
          מפה אסטרולוגית מדויקת תפתח לך חלון עמוק לעצמך – תגלי מה הייעוד שלך,
          מהם הכוחות שקיבלת, ומהם השיעורים שהיקום מזמן לך. מתאים במיוחד לפני
          החלטות גדולות, פרויקטים, התחלת קשרים או כשאת מרגישה תקועה.
        </p>
      </div>

      <div
        className="custom-bg-gold fs-5 text-center p-2"
        style={{ borderRadius: "20px" }}
      >
        <strong className="custom-purple-color">
          <span
            onClick={() => handleClike("/My-services/Astrological-map")}
            className="cursor-pointer"
          >
            גילוי עצמי דרך מפה אסטרולוגית ›
          </span>
        </strong>
      </div>

      <div className="my-3">
        <h3>🧘‍♀ הגנות ושחרורים | ניקוי אנרגטי</h3>
        <p>
          מרגישה עייפות לא מוסברת? תחושת עומס או "עין"? הגיע הזמן לנקות את
          האנרגיה. בטיפול בעופרת ובתדרים טיבטיים נאזן את ההילה, נשחרר מטען רגשי
          ונחזיר את האור.
        </p>
      </div>

      <div
        className="custom-bg-gold fs-5 text-center p-2"
        style={{ borderRadius: "20px" }}
      >
        <strong className="custom-purple-color">
          <span
            onClick={() => handleClike("/My-services/Lead-cleaning")}
            className="cursor-pointer"
          >
            ניקוי בעופרת וקערות טיבטיות ›
          </span>
        </strong>
      </div>

      <div className="my-3">
        <h3>💖 רוצה להתחיל תהליך או לשאול שאלה?</h3>
        <p>
          אפשר לשלוח לי הודעה <strong>בוואטסאפ</strong> או למלא את הטופס הקצר
          כאן למטה – אני אחזור אלייך בהקדם באהבה 💌
        </p>

        <h4>
          <a
            href="https://wa.me/972524513043"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success mt-2"
          >
            לחצי כאן לשליחת הודעת וואטסאפ
          </a>
        </h4>
      </div>
    </div>
  );
}

export default MyServices;
