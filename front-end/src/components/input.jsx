// הרכיב הבא הינה רכיב שמייצר שדה קלט גמיש, יכול להציג טופס מסוג טקסט, טקסטאריה עבור מנהל לתכנים, או סיסמא
// מבצע הצגה דינמית של דשה קלט תוך דגש על הצגת שגיאות והצגת טקסט עבור סיסמאות

function Input({ label, type, rows = 8, ...rest }) {
  return (
    <>
      <div className="mb-3">
        <label className="form-label" htmlFor={rest.name}>
          {label}
          {rest.required && <span className="text-danger ms-1">*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            id={rest.name}
            className={`form-control ${rest.error ? "is-invalid" : ""}`}
            style={{
              minHeight: "150px",
              width: "90vw", // רוחב גמיש
              maxWidth: "700px", // לא יגדל מעבר ל-700px
              resize: "vertical",
            }}
            rows={rows}
            {...rest}
          />
        ) : (
          <input
            type={type}
            {...rest}
            className={["form-control", rest.error && "is-invalid"]
              .filter(Boolean)
              .join(" ")} // שילוב מחלקות CSS לפי תנאי, אם יש שגיאה
            id={rest.name}
          />
        )}
      </div>

      {/* תנאים לסיסמה */}
      {rest?.name === "password" && (
        <small
          className="form-text text-muted text-end"
          style={{ direction: "rtl" }}
        >
          סיסמה חייבת להכיל לפחות:
          <ul>
            <li>אות אחת גדולה ואות אחת קטנה באנגלית</li>
            <li>לפחות ארבעה מספרים</li>
            <li>סימן מיוחד (למשל: !@%$#^&*-_*)</li>
            <li>לפחות 8 תווים בסך הכל</li>
          </ul>
        </small>
      )}

      {rest.error && (
        <div className="invalid-feedback d-block">{rest.error}</div>
      )}
    </>
  );
}

export default Input;
