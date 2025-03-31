import httpService from "./httpService";
//  פונקציה אסינכרונית שמבצעת קריאה לשרת כדי לקבל נתונים על תוכן אסטרולוגי.
export async function getAllContents() {
  return await httpService.get("/content/zodiac");
}

//   פונקציה אסינכרונית שמבצעת קריאה לשרת כדי לקבל נתונים על הורוסקופים.
export async function getAllHoroscop() {
  return await httpService.get("/content/horoscops");
}

//   פונקציה אסינכרונית שמבצעת קריאה לשרת כדי לקבל נתונים על הורוסקופ לפי מזהה ייחודי.
export async function getHoroscop(ID) {
  return await httpService.get(`/content/horoscops/${ID}`);
}

// פונקציה אסינכרונית שמבצעת בקשה לשרת יחד עם הארגומנט שמצפה לקבל ערך בפונקציה בעתיד במטרה ליצור תוכן חדש על דיי מנהל בלבד.
export async function createHoroscop(data) {
  const content = await httpService.post("/content/admin/", data);
  return content.data;
}

// פונקציה אסינכרונית שמבצעת בקשה לשרת  על דיי מנהל בלבד במטרה לעדכן תוכן קיים לפי מזהה של אותו התוכן יחד עם הארגומנט שצפוי להתקבל כערך בפונקציה.
export async function updateHoroscop(ID, data) {
  const updateContent = await httpService.put(`/content/admin/${ID}`, data);
  return updateContent.data;
}
// פונקציה אסינכרונית שמבצעת בקשה לשרת לצורך מחיקת הורוסקופ לפי המזהה של אותו הורוסקופ שצפוי להתקבל כערך בפונקציה בעתיד
export async function deleteHoroscop(ID) {
  const content = await httpService.delete(`/content/admin/${ID}`);
  return content.data;
}

// פונקציה אסינכרונית שמבצעת בקשה לשרת לצורך עדכון מחווה עבור אותו הורוסקופ מהמשתמש או ביטול אותו מחווה
export async function likeHoroscop(ID) {
  const response = await httpService.patch(`/content/horoscops/${ID}`);
  return response.data;
}

// ייצוא הפונקציות של בקשות וקריאות לשרת אל הקונטקסט של ניהול הורוסקופים
const contentService = {
  getAllContents,
  getHoroscop,
  createHoroscop,
  updateHoroscop,
  deleteHoroscop,
  likeHoroscop,
};

export default contentService;

// /content/horoscope/:id
