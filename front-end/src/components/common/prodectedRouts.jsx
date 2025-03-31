import { useAuth } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
// ניהול הרשאות עבור משתמש רשום ומנהל ושימוש בפונקציה ברכיבים הרלווטיים
const ProtectedRouts = ({ children, isAdmin = false }) => {
  const { user, logOut } = useAuth();

  if (!user || (isAdmin && !user.isAdmin)) {
    logOut();
    return <Navigate to={"/sign-in"} />;
  }

  return children;
};

export default ProtectedRouts;
