import Btn from "./btn";
// הרכיב הבא  מציג פרטי משתמש בצורה דינמית, עם אפשרות להציג או להסתיר מידע נוסף תלוי במצבים שונים
//  הרכיב מקבל מספר פרופס ומציג את המידע הנדרש תוך שימוש בכפתורים שמבצעים פעולות שונות.
function User({
  firstName,
  lastName,
  phone,
  email,
  state,
  country,
  city,
  street,
  houseNumber,
  zip,
  createdAt,
  userDetalis = () => {},
  deleteUser = () => {},
  isUserDetalisComponnet = false,
  isAdmin = false,
  isAdminUserDetalis = false,
}) {
  return (
    <div className="container" dir="rtl">
      <div className="d-flex flex-column pb-1 my-3 user-detalis">
        <div className="card shadow-lg border-1 p-3 custom-bg-gold ">
          <p>שם פרטי: {firstName}</p>
          <p>שם משפחה: {lastName}</p>
          {isUserDetalisComponnet && (
            <>
              <p>טלפון: {phone}</p>
              <p>אימייל: {email}</p>
              <p>מחוז: {state}</p>
              <p>מדינה: {country}</p>
              <p>עיר: {city}</p>
              <p>רחוב: {street}</p>
              <p>מספר בית: {houseNumber}</p>
              <p>מיקוד: {zip}</p>
            </>
          )}

          {isAdminUserDetalis && (
            <>
              <p>נוצר בתאריך: {createdAt}</p>
              <Btn
                description={"מחק/י משתמש"}
                className={"custom-bg-purple w-50 m-auto custom-gold-color"}
                fn={deleteUser}
              />
            </>
          )}
          {isAdmin && (
            <>
              <Btn
                description={"הצג/י פרטי משתמש"}
                className={"custom-bg-purple w-50 m-auto custom-gold-color"}
                fn={userDetalis}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
