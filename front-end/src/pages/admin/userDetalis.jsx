import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../components/user";
import { useAuth } from "../../context/auth.context";

// הרכיב הבא הוא עבור ניהול משתמש על ידיי מנהל
// ניתן לראות את פרטיו המלאים יחד עם אפשרות למחוק אותו במיקרה הצורך

function UserDetalis() {
  const {
    deleteUserByAdmin,
    error,
    loading,
    getUserForAdmin,
    userDetalis,
    user,
    users,
    getAllUsers,
    setUserDetalis,
  } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (!id) return;

    setUserDetalis(null); // איפוס המידע הקודם כדי למנוע הצגת נתונים ישנים

    const fetchUserForAdmin = async () => {
      try {
        await getUserForAdmin(id);
      } catch (error) {}
    };
    fetchUserForAdmin();
  }, [id, user, users]);

  const handleDeletedUser = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this account? This action cannot be undone."
    );
    if (!isConfirmed) return;

    await deleteUserByAdmin(id);
    navigate("/admin/users");
  };

  const isIdExist = users.some((user) => user?._id === id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: {error}</div>;
  }

  if (!isIdExist) {
    return <div>User not found</div>;
  }

  if (!userDetalis) {
    return <div>Loading user details...</div>;
  }
  return (
    <>
      <User
        key={id}
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
        createdAt={userDetalis?.createdAt}
        isUserDetalisComponnet
        isAdminUserDetalis
        deleteUser={() => {
          handleDeletedUser();
        }}
      />
    </>
  );
}

export default UserDetalis;
