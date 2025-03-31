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
    <div className="container">
      <div className="d-flex flex-column pb-1 my-3 user-detalis">
        <div className="card shadow-lg border-1 p-3 custom-bg-gold">
          <p>firstName: {firstName}</p>
          <p>lastName: {lastName}</p>
          {isUserDetalisComponnet && (
            <>
              <p>phone: {phone}</p>
              <p>email: {email}</p>
              <p>state: {state}</p>
              <p>country: {country}</p>
              <p>city: {city}</p>
              <p>street: {street}</p>
              <p>houseNumber: {houseNumber}</p>
              <p>zip: {zip}</p>
            </>
          )}

          {isAdminUserDetalis && (
            <>
              <p>createdAt: {createdAt}</p>
              <Btn
                description={"Delete User"}
                className={"custom-bg-purple w-50 m-auto custom-gold-color"}
                fn={deleteUser}
              />
            </>
          )}
          {isAdmin && (
            <>
              <Btn
                description={"Get User Details"}
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
