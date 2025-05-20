import { createContext, useContext, useEffect, useState } from "react";
import contentService, { getAllHoroscop } from "../services/contentService";
import { useAuth } from "./auth.context";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ruleManagement } from "../components/common/ruleManagement"; // ייבוא של פונקציה עבור משתמש שנמחק על ידיי מנהל בעודו מחובר , והחזרת הודעה תואמת אליו

export const ContentContext = createContext();
ContentContext.displayName = "Content";

// הקוד הבא מנהל את הנתונים הקשורים להורוסקופים ומספק פונקציות שונות עבור אינטראקציות עם השרת.
// הקונטקסט כולל מגוון פונקציות לניהול הורוסקופים, כמו יצירה, עדכון, מחיקה ולייקים.
//  בנוסף, הוא מאפשר למשתמשים לחפש הורוסקופים, לעדכן את רשימת המועדפים שלהם ולנהל את תוצאות החיפוש.

export function ContentProvider({ children }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [horoscops, setHoroscops] = useState([]);
  const [horoscop, sethoroscop] = useState({});
  const [favorites, setFavorites] = useState([]);
  const { user, logOut } = useAuth();
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();
  const [zodiacSigns, setZodiacSign] = useState();

  const handleSearchResult = (result) => {
    setSearchResult(result);
  };

  const getSigns = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await contentService.getCategories();
      setZodiacSign(response);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getHoroscops = async () => {
    setLoading(true); // מתחיל טעינה
    setError(null);

    try {
      const response = await getAllHoroscop();
      setHoroscops(response.data.contents);
      return response.data.contents;
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
      setLoading(false); // מסיים טעינה
    }
  };

  const getHoroscop = async (ID) => {
    setLoading(true);
    setError(null);

    try {
      const response = await contentService.getHoroscop(ID);

      sethoroscop(response.data);
      return response.data;
    } catch (err) {
      ruleManagement({
        logOut,
        navigate,
        err,
      });
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
      if (err?.response?.status === 404) {
        alert("horoscop deleted or not found");
        navigate("/horoscops");
      }
      await getHoroscops();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createHoroscop = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await contentService.createHoroscop(data);
      getHoroscops();
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateHoroscop = async (ID, DATA) => {
    setLoading(true);
    setError(null);

    try {
      const response = await contentService.updateHoroscop(ID, DATA);
      return response;
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const likeHoroscop = async (ID) => {
    setLoading(true);
    setError(null);

    try {
      await contentService.likeHoroscop(ID);
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
      ruleManagement({
        logOut,
        navigate,
        err,
      });
      if (err?.response?.status === 404) {
        alert("horoscop deleted or not found");
        await getHoroscops();
        navigate("/horoscops");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // פונקציה לבדיקת המשתמש שעשה את הפעולה ושמירת התוכן במועדפים
  const fetchToLike = async () => {
    const data = await getHoroscops();

    const updatedFavorites = data.filter((h) =>
      h.likes.some((userId) => userId === user.id)
    );
    setFavorites(updatedFavorites);
    await getHoroscops();
  };

  useEffect(() => {
    if (user) {
      // מוודא שהמשתמש מחובר
      fetchToLike();
    }
  }, [user]); // מפעיל שוב רק אם יש שינוי במשתמש

  const deleteHoroscop = async (ID) => {
    setLoading(true);
    setError(null);

    try {
      await contentService.deleteHoroscop(ID);
      //  h._id !== ID → כלומר, תשאיר רק את האובייקטים שה-_id שלהם שונה מה-ID שנמחק
      setSearchResult((prev) => prev.filter((h) => h?._id !== ID));
      getHoroscops();
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
    if (searchResult?.length === 0) {
      getHoroscops(); // רק אם אין תוצאה בחיפוש, טוען מחדש
    }
  }, [searchResult]);
  return (
    <ContentContext.Provider
      value={{
        handleSearchResult,
        searchResult,
        setSearchResult,
        getHoroscops,
        error,
        loading,
        horoscops,
        getHoroscop,
        horoscop,
        createHoroscop,
        likeHoroscop,
        favorites,
        setFavorites,
        fetchToLike,
        updateHoroscop,
        deleteHoroscop,
        setError,
        getSigns,
        zodiacSigns,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
