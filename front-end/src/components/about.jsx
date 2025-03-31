// רכיב אודות עבור ממשק האתר ופעולות בו ניתן לבצע

function About() {
  return (
    <div className="container text-center my-5 rtl">
      <h1 className="fw-bold custom-text-gold">📖 אודות האתר</h1>

      <div className="card shadow-lg p-4 custom-bg-light text-end">
        <p className="fs-5">
          האתר הזה נוצר עבור חובבי אסטרולוגיה שרוצים להתעדכן{" "}
          <strong>בהורוסקופים יומיים ושבועיים</strong>.
          <br />
          מדי שבוע, עדן בן אור - אסטרולוגית מומחית, תפרסם תחזיות אסטרולוגיות,
          מידע מעמיק על המזלות ועוד תכנים מרתקים.
        </p>

        <h4 className="mt-4">👤 מה תקבלו באתר?</h4>
        <ul className="list-unstyled fs-5">
          <li>✔️ צפייה בתחזיות אסטרולוגיות המתעדכנות באופן קבוע</li>
          <li>✔️ מידע מקיף על 12 המזלות</li>
          <li>✔️ אפשרות למשתמשים רשומים לסמן לייק ולשמור תחזיות במועדפים</li>
          <li>
            ✔️ קישורים לתוכן בלעדי בערוצי{" "}
            <strong>YouTube, TikTok ו-Instagram</strong>
          </li>
        </ul>

        <p className="fs-5">
          🔹 <strong>משתמשים רשומים</strong> מקבלים גישה מלאה לכל ההורוסקופים
          ויכולים לשמור תכנים שאהבו.
          <br />
          🔹 <strong>למי שלא רשום</strong> – זמינה סקירה כללית על המזלות בלבד.
        </p>

        <h4 className="mt-4">📝 יכולות המנהלת</h4>
        <ul className="list-unstyled fs-5">
          <li>✔️ המנהלת יכולה להוסיף, לערוך ולעדכן תוכן באתר בכל זמן.</li>
          <li>
            ✔️ המנהלת יכולה למחוק תוכן שפורסם אם הוא לא עומד בתנאי השימוש של
            האתר.
          </li>
        </ul>

        <h4 className="mt-4">⚖️ תנאי השימוש</h4>
        <p className="fs-5">
          כל משתמש המעוניין להשתמש באתר מתחייב לעמוד בתנאי השימוש של האתר.
          <br />
          אם יימצא שמשתמש מפר את חוקי האתר, המנהלת רשאית להפסיק את גישתו לאתר
          ולהסירו.
        </p>

        <div className="alert alert-info fs-5 text-center">
          ✨ <strong>הירשמו עכשיו ותתחילו ליהנות מהתוכן המלא!</strong>
        </div>
      </div>
    </div>
  );
}

export default About;
