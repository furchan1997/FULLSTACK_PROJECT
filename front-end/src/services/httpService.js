import config from "../config.json";
import axios from "axios";

// הקובץ מגדיר שירות HTTP מותאם אישית
//  שמבוסס על אקסיוס, ומטרתו לספק ממשק אחיד ונוח לביצע בקשות HTTP בפרויקט.
axios.defaults.baseURL = config.apiURL;
// הגדרת פונקציה לניהול כותרות
// מאפשרת להגדיר כותרות ברירת מחדל לכל בקשה יוצאת
export function setDefaultCommonHeaders(headerName, value) {
  axios.defaults.headers.common[headerName] = value;
}
// ייצוא של האובייקט עם הבקשות
const httpService = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  patch: axios.patch,
  setDefaultCommonHeaders,
};

export default httpService;
