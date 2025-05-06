import { jwtDecode } from "jwt-decode";
import httpService, { setDefaultCommonHeaders } from "../services/httpService";

// הגדרת משתנה שיכיל את המפתח בלוקאל סטורג' בשם טוקן
const TOKEN_KEY = "token";

// רענון הכותרת בתחילה
refreshToken();

//  פונקציה שמעדכנת את כותרת הבקשות עם הטוקן הנוכחי של המשתמש
export function refreshToken() {
  setDefaultCommonHeaders("x-auth-token", getJWT());
}

// שמירת הטוקן בלוקאל סטורג
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  refreshToken();
}

// פונקציה אסינכרונית שמבצעת בקשה לשרת לצורך התחברות
// מקבל את הטוקן מהשרת ומכניס אותו כארגומנט אל הפונקציה שצפויה לקבל טוקן כפרמטר ולשמור אותו בלוקאל סטורג
export async function logIn(credentials) {
  const response = await httpService.post("/auth/login", credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  setToken(response.data.token);

  return response;
}

// פונקציה שמטרתה להוציא את המשתמש המחובר מהמערכת
// הפונקציה מאפסת את הטוקן שבלוקאל סטורג לחסר ערך כאשר מופעלת
export function logOut() {
  return setToken(null);
}

// פונקציה אסינכרונית מבצעת בקשה לשרת לצורך יצירת משתמש חדש
// הפונקציה מצפה לקבל את הערך של פרטי המשתמש כפרמטר
export async function createUser(user) {
  return await httpService.post("/users", user);
}

// פונקציה שמחזירה את הטוקן השמור בלוקאל סטורג תחת המפתח השמור
export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

// פונקצייה שמחזירה את פרטי המשתמש על ידיי פענוח הטוקן ששמור בלוקאל סטורג
// במיקרה שטוקן לא תקין או לא קיים הפונקציה תחזיר נאל
export function getUser() {
  try {
    const token = getJWT();
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
}

// פונקציה אסינכרונית שמבצעת קריאה לשרת לצורך קבלת כל המשתמשים עבור מנהל בלבד
export async function getAllUsers() {
  const users = await httpService.get("/users/");
  return users;
}

// פונקציה אסינכרונית שמבצעת קריאה לשרת לצורך קבלת משתמש לפי המזהה שלו
export async function getUserByID() {
  const user = getUser();
  const me = await httpService.get("/users/" + user?.id);
  return me.data;
}

// פונקציה אסינכרונית שמבצעת קריאה לשרת לצורך קבלת משתמש לפי המזהה עבור מנהל בלבד
export async function getUserByIDForAdmin(ID) {
  const user = await httpService.get(`/users/${ID}`);
  return user.data;
}

// פונקציה אסינכרונית שמבצעת בקשה לשרת לצורך עריכת פרטי משתמש לפי המזהה שלו
export async function updateUser(userUpdate) {
  const user = getUser();
  const userID = user.id || userUpdate._id;
  const update = await httpService.put("/users/" + userID, userUpdate);
  return update;
}

// פונקציה אסינכרונית שמבצעת בקשה לשרת לצורך עדכון הסיסמא של אותו המשתמש לפי המזהה שלו
export async function updateUserPassword(password) {
  const user = getUser();

  const updatePassword = await httpService.patch("/users/" + user.id, password);

  return updatePassword;
}

// פונקצייה אסינכרונית שמבצעת בקשה לשרת לצורך מחיקת משתמש
export async function deleteUser() {
  const user = getUser();
  const response = await httpService.delete("/users/" + user.id);
}

// פונקצייה אסינכרונית שמבצעת בקשה לשרת לצורך מחיקת משתמש עבור מנהל
export async function deleteUserByAdmim(userID) {
  const response = await httpService.delete(`/users/${userID}`);

  return response;
}

export async function createContact(message) {
  const response = await httpService.post("/create-contact/", message);
  console.log(response);
  return response;
}

export async function getMessages() {
  return httpService.get("/create-contact/");
}

export async function deleteAllMsgs() {
  return httpService.delete("/create-contact/delete");
}

export async function deleteMsgById(ID) {
  return httpService.delete(`/create-contact/delete/${ID}`);
}

// ייצוא של הפונקציות האסינכרוניות שמבצעות את הבקשות , יהיה שימוש בהן בקונסטסט של ניהול המשתמשים
const userService = {
  refreshToken,
  logIn,
  setToken,
  createUser,
  getUser,
  logOut,
  getUserByID,
  updateUser,
  updateUserPassword,
  getAllUsers,
  getUserByIDForAdmin,
  deleteUser,
  deleteUserByAdmim,
  createContact,
  getMessages,
  deleteAllMsgs,
  deleteMsgById,
};

export default userService;
