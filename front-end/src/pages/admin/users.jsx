import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.context";
import User from "../../components/user";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/input";
// הרכיב הבא הינו עבור מנהל שיוכל לראות את כל המשתמשים הרשומים לאתר
// ניתן לראות כאן רק חלק מהפרטים של אותם משתמשים
// יש אפשרות לחיפוש משתמש על ידיי שם ושם משפחה
function Users() {
  const { getAllUsers, users, loading, error } = useAuth();
  const [value, setValue] = useState("");
  const [filterdUser, setFilteredUsers] = useState(users); // ניהול מצב לתחזוקת רשימת המשתמשים המסוננת
  const navigate = useNavigate();
  // טעינת השתמשים כשהרכיב נטען לראשונה

  useEffect(() => {
    const fetchUsers = async () => {
      await getAllUsers();
    };

    fetchUsers();
  }, []);

  // סינון לפי הערך של ה-input
  useEffect(() => {
    if (value.trim() === "") {
      setFilteredUsers(users); // אם אין חיפוש, מחזיר את כל המשתמשים
    } else {
      setFilteredUsers(
        users?.filter((user) =>
          ["firstName", "lastName"].some((key) =>
            user[key]?.toLowerCase().includes(value?.toLowerCase())
          )
        )
      );
    }
  }, [value, users]); //  מאזין לכל שינוי בחיפוש או ברשימת המשתמשים

  const getUserForAdmin = (ID) => {
    navigate(`/admin/users/${ID}`);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>ERROR: {error}</div>;
  }

  return (
    <>
      <div className="container d-flex justify-content-center p-4 w-75">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e?.target?.value)}
          placeholder="חפש משתמשים"
        />
      </div>
      <div>
        {filterdUser.map((user) => (
          <User
            key={user?._id}
            firstName={user?.firstName}
            lastName={user?.lastName}
            userDetalis={() => {
              getUserForAdmin(user?._id);
            }}
            isAdmin
          />
        ))}
      </div>
    </>
  );
}

export default Users;
