import Btn from "../components/btn";
import User from "../components/user";
import { useAuth } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { alertDeleting } from "../components/common/alertDeleting";

function UserMe() {
  const {
    getUserDetalis,
    userDetalis,
    user,
    error,
    loading,
    deleteUser,
    logOut,
  } = useAuth(); // קבלת הנתונים  מה-Provider
  const navigate = useNavigate();
  const { id } = useParams();

  const userID = user?.id || userDetalis?._id;

  const handleChengeDetalis = () => {
    navigate(`/update-user/${userID}`);
  };

  const handleDeletedUser = (ID) => {
    alertDeleting(async () => {
      await deleteUser(ID);
      logOut();
      navigate("/sign-in");
    });
  };
  // אם המזהה של משתמש שמתקבל מהפרובידר של ניהול משתמשים לא תואם למזהה שקיים בכתובת URL
  // מוציא אותו מהמערכת אל דף התחברות
  // מנקה את הטוקן
  // עבור משתמש שמנסה לקבל פרטים של משתמש אחר ליתר ביטחון עשיתי את זה
  useEffect(() => {
    if (id !== user?.id) {
      navigate("/sign-in");
      logOut();
      return;
    }
  }, [navigate, user?.id]);
  //  הפעלת הפונקציה של קבלת פרטי משתמש בזמן שיש שינוי במזהה
  useEffect(() => {
    getUserDetalis();
  }, [userDetalis?._id]); // הפעלת הפונקציה רק שיש שינוי במזהה

  if (loading) return <p className="rtl">טוען...</p>;
  {
    /* מציג הודעת טעינה */
  }
  if (error) return <p className="rtl">שגיאה: {error}</p>;
  {
    /* מציג הודעת שגיאה */
  }

  return (
    <>
      <div className="container">
        <h2 className="text-center">הפרטים שלך</h2>

        <User
          key={userID}
          firstName={userDetalis?.firstName}
          lastName={userDetalis?.lastName}
          email={userDetalis?.email}
          phone={userDetalis?.phone}
          state={userDetalis?.address?.state}
          city={userDetalis?.address?.city}
          country={userDetalis?.address?.country}
          street={userDetalis?.address?.street}
          houseNumber={userDetalis?.address?.houseNumber}
          zip={userDetalis?.address?.zip}
          isUserDetalisComponnet
        />
        <div className="m-auto d-flex gap-1 w-50">
          <Btn
            fn={handleChengeDetalis}
            description={"עדכן/י פרטים"}
            type={"submit"}
            className="custom-bg-purple custom-gold-color"
          />

          <Btn
            fn={() => handleDeletedUser(userID)}
            description={"מחק/י משתמש"}
            type={"submit"}
            className="custom-bg-purple custom-gold-color"
          />
        </div>
      </div>
    </>
  );
}

export default UserMe;
