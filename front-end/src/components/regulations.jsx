// תקנון האתר וחוקיו

function Regulations() {
  return (
    <div className="container text-center my-5 rtl">
      <h1 className="fw-bold custom-text-gold">📜 תקנון האתר</h1>

      <div className="card shadow-lg p-4 custom-bg-light text-end">
        <h4 className="mt-4">1. כללי השימוש</h4>
        <p className="fs-5">
          אתר זה מיועד למי שמעוניין לעקוב אחרי תחזיות אסטרולוגיות וללמוד מידע
          אודות 12 המזלות. כל משתמש באתר מתחייב להקפיד על כללי השימוש ולפעול
          בהתאם לתנאי התקנון.
        </p>

        <h4 className="mt-4">2. גישה למידע</h4>
        <p className="fs-5">
          כל משתמש רשום יקבל גישה מלאה לתכנים באתר, כולל הורוסקופים יומיים
          ושבועיים, מידע מקיף על המזלות, ועוד. משתמשים לא רשומים יוכלו לצפות אך
          ורק במידע כללי על 12 המזלות.
        </p>

        <h4 className="mt-4">3. זכויות המנהלת</h4>
        <p className="fs-5">
          המנהלת, עדן בן אור, שומרת לעצמה את הזכות להוסיף, לעדכן ולערוך תוכן
          באתר בכל עת. כמו כן, המנהלת שומרת לעצמה את הזכות למחוק או לערוך תוכן
          לא הולם או מפר את כללי השימוש של האתר.
        </p>

        <h4 className="mt-4">4. זכויות יוצרים</h4>
        <p className="fs-5">
          כל התוכן באתר, כולל ההורוסקופים, המאמרים, הגרפיקה, הלוגואים וההסרטונים
          – הם רכושו של האתר ואין להעתיקם, להפיץ אותם או להשתמש בהם ללא רשות
          מראש מהמנוהלת.
        </p>

        <h4 className="mt-4">5. שימוש באתר</h4>
        <p className="fs-5">
          האתר נועד לשימוש אישי בלבד. כל שימוש מסחרי או הפצה של התכנים באתר אסור
          בתכלית. כל ניסיון לנצל את התכנים לרווח אישי או כל פעולה לא ראויה תישקל
          לפי הצורך ותביא לעיכוב או חסימתו של המשתמש.
        </p>

        <h4 className="mt-4">6. פרטיות</h4>
        <p className="fs-5">
          פרטיותך חשובה לנו. פרטי המשתמשים נשמרים בהתאם לחוק הגנת הפרטיות, והם
          לא יועברו לצדדים שלישיים ללא אישור מפורש. על פי הצורך, פרטי המשתמשים
          עשויים לשמש למטרות שיווקיות אם המשתמש מסכים לכך.
        </p>

        <h4 className="mt-4">7. תנאי הרשמה</h4>
        <p className="fs-5">
          המשתמשים הנרשמים לאתר מתחייבים לספק מידע נכון ומדויק, וכן לעדכן את
          המידע במקרה של שינוי. במקרה של הצגת מידע שקרי, האתר שומר לעצמו את
          הזכות למחוק את חשבון המשתמש.
        </p>

        <h4 className="mt-4">8. סנקציות על הפרת תנאי השימוש</h4>
        <p className="fs-5">
          במידה ומשתמש מפר את תקנון האתר, המנהלת שומרת לעצמה את הזכות לנקוט
          בסנקציות, כולל חסימת גישה או מחיקת תוכן שהועלה על ידי המשתמש.
        </p>

        <h4 className="mt-4">9. עדכון התקנון</h4>
        <p className="fs-5">
          האתר שומר לעצמו את הזכות לעדכן את התקנון מעת לעת. כל שינוי יפורסם באתר
          ויש לו תוקף מיידי.
        </p>

        <h4 className="mt-4">10. יצירת קשר</h4>
        <p className="fs-5">
          במקרה של שאלות או בעיות עם השימוש באתר, ניתן ליצור קשר עם המנהלת דרך
          עמוד האינסטגרם שלה.
        </p>

        <div className="alert alert-info fs-5 text-center">
          ✨{" "}
          <strong>
            המשתמשים שמסכימים לתנאים אלו יכולים להירשם ולהתחיל להשתמש בתכני
            האתר!
          </strong>
        </div>
      </div>
    </div>
  );
}

export default Regulations;
