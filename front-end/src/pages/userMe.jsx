import Btn from "../components/btn";
import User from "../components/user";
import { useAuth } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

  const handleDeletedUser = async (ID) => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      await deleteUser(ID);
      logOut();
      navigate("/sign-in");
    }
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="container ">
        <h2 className="text-center">Yore detalis:</h2>

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
            description={"update detalis"}
            type={"submit"}
            className="custom-bg-purple custom-gold-color"
          />

          <Btn
            fn={() => handleDeletedUser(userID)}
            description={"Delete"}
            type={"submit"}
            className="custom-bg-purple custom-gold-color"
          />
        </div>
      </div>
    </>
  );
}

export default UserMe;
