import { createContext, useContext, useEffect, useState } from "react";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";
import { ruleManagement } from "../components/common/ruleManagement"; // ייבוא של פונקציה עבור משתמש שנמחק על ידיי מנהל בעודו מחובר , והחזרת הודעה תואמת אליו

// הרכיב פרובידר משתמש ב-קונטקסט איי.פי.איי של ריאקט כדי לנהל את המצב של המשתמש ולספק פונקציות שונות הקשורות לאימות וניהול משתמשים.
// הוא מספק את המידע הדרוש על המשתמש, פעולות כמו התחברות, יציאה, עדכון פרטי משתמש, מחיקת משתמשים ועוד.
// כל הפונקציות והמצבים שקשורים למידע משתמש מנוהלים על ידי הרכיב ומסופקים לצרכים אחרים דרך ה-קונטקסט.
export const AuthContext = createContext();
AuthContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(userService.getUser());
  const [userDetalis, setUserDetalis] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // הוספת סטייט של שגיאה
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const refreshUser = () => setUser(userService.getUser());

  const logIn = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.logIn(credentials);
      setUser(response.data);
      refreshUser();
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
      throw err; // שיגור השגיאה חזרה למי שקורא לפונקציה
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    userService.logOut();
    setUser(null);
    setUserDetalis(null);
    setError(null); // מנקה שגיאה ביציאה
    refreshUser();
  };

  const getUserDetalis = async () => {
    if (!user) {
      setError("User not found."); // אם אין משתמש, מגדירים שגיאה מתאימה
      setLoading(false);
      logOut();
      return;
    }

    try {
      // סטייט נפרד בכדי לנהל את פרטי המשתמש
      const user = await userService.getUserByID();
      setUserDetalis(user);
      setError(null); // אם הבקשה הצליחה, מנקים את השגיאה
    } catch (err) {
      ruleManagement({
        logOut,
        navigate,
        err,
      });
      refreshUser();
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (ID) => {
    setLoading(true);
    setError(null);

    try {
      await userService.deleteUser(ID);
    } catch (err) {
      ruleManagement({
        logOut,
        navigate,
        err,
      });
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUserByAdmin = async (userID) => {
    setLoading(true);
    setError(null);

    try {
      await userService.deleteUserByAdmim(userID);

      alert("User deleted successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetalis();
  }, [user]);

  const getUserForAdmin = async (ID) => {
    setUserDetalis(null); // איפוס כדי למנוע תצוגה ישנה

    try {
      const user = await userService.getUserByIDForAdmin(ID);
      setUserDetalis(user);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const userUpdate = async (updateData) => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await userService.updateUser(updateData);
      getUserDetalis();
    } catch (err) {
      ruleManagement({
        logOut,
        navigate,
        err,
      });
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserPassword = async (value) => {
    setLoading(true);
    setError(null);

    try {
      await userService.updateUserPassword(value);
    } catch (err) {
      ruleManagement({
        logOut,
        navigate,
        err,
      });
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          err?.message ||
          "Something went wrong"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const allUsers = await userService.getAllUsers();
      setUsers(allUsers.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data ||
          err?.message ||
          "Something went wrong"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userDetalis,
        setUserDetalis,
        loading,
        error, // שולחים את error דרך ה-Provider
        getUserDetalis,
        userUpdate,
        logIn,
        logOut,
        signUp: userService.createUser,
        deleteUser,
        deleteUserByAdmin,
        updateUserPassword,
        getUserForAdmin,
        getAllUsers,

        users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
