const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const authMW = require("../middleware/auth");
const adminAuthMW = require("../middleware/adminAuth");
const { Content, validateContent } = require("../models/content");
const { User } = require("../models/users");
const verifyUserExists = require("../middleware/verifyUserExists");
const filePath = path.resolve(__dirname, "..", "data", "zodiacArticles.json");
const zodiacArticels = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// קבלת התכנים כל הדינמיים שרק משתמשים רשומים במערכת יכולים לגשת אליהם
router.get("/horoscops", authMW, verifyUserExists, async (req, res, next) => {
  try {
    const contents = await Content.find();

    res.json({
      message: "All contents.",
      contents,
    });
  } catch (error) {
    next(error); // מעביר את השגיאה ל-Middleware של השגיאות
  }
});

// קבלת תוכן דינמי עבור משתמש רשום בלבד לפי מזהה התוכן
router.get(
  "/horoscops/:id",
  authMW,
  verifyUserExists,
  async (req, res, next) => {
    try {
      const content = await Content.findById(req.params.id);

      if (!content) {
        res
          .status(404)
          .json({ message: "Article not found. Or deleted by admin." });
        return;
      }

      res.json(content);
    } catch (error) {
      next(error); // מעביר את השגיאה ל-Middleware של השגיאות
    }
  }
);

// יצירת תוכן חדש באמצעות מנהל בלבד
router.post("/admin", authMW, adminAuthMW, async (req, res, next) => {
  try {
    // בדיקת תקינות קלט מהמשתמש
    const { error } = validateContent(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    // יצירת תוכן חדש ושמירתו במסד הנתונים
    const content = new Content({
      ...req.body,
      url:
        req.body.image.url ??
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO59DbN8_8JTIuLiyMOOWFde_rHdAG1CpRBA&s",
    });
    await content.save();

    res.status(201).json({
      message: "New content created successfully.",
      content,
    });
  } catch (error) {
    next(error); // מעביר את השגיאה ל-Middleware לטיפול בשגיאות
  }
});

// עריכת תוכן קיים באמצעות מנהל בלבד
router.put("/admin/:id", authMW, adminAuthMW, async (req, res, next) => {
  try {
    // בדיקת תקינות קלט מהמשתמש
    const { error } = validateContent(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    // בדיקת קיום התוכן במסד הנתונים
    const contentExisting = await Content.findById(req.params.id);
    if (!contentExisting) {
      res.status(404).json({ message: "Content not found." });
      return;
    }

    // עדכון התוכן הקיים
    const content = await Content.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: "after" }
    );

    res.status(200).json({
      message: "Content updated successfully.",
      content,
    });
  } catch (error) {
    next(error); // מעביר את השגיאה לטיפול במידלוואר
  }
});

// מחיקת תוכן קיים באמצעות מנהל בלבד
router.delete("/admin/:id", authMW, adminAuthMW, async (req, res) => {
  try {
    // מחפש ומוחק את התוכן על פי ה-ID
    const content = await Content.findOneAndDelete({ _id: req.params.id });

    // אם התוכן לא נמצא, מחזיר שגיאה
    if (!content) {
      res.status(404).json({ message: "Content not found." });
      return;
    }

    // מחזיר את התגובה עם הודעה שהמידע נמחק
    res.json({
      message: "Content deleted.",
      content,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// לייק עבור תוכן מיוחד שהגישה אליו היא עבור משתמש רשום בלבד
router.patch("/horoscops/:id", authMW, verifyUserExists, async (req, res) => {
  try {
    // מחפש את התוכן לפי ה-ID
    const content = await Content.findById(req.params.id);

    // אם התוכן לא נמצא, מחזיר שגיאה
    if (!content) {
      res.status(404).send("Content not found.");
      return;
    }

    // אם הלייק כבר קיים, מסיר אותו
    if (content.likes.includes(req.user.id)) {
      content.likes = content.likes.filter((like) => like !== req.user.id);
      await content.save();

      res.json({
        message: "Like removed.",
        likesCount: content.likes.length, // החזרת רק את מספר הלייקים
      });
      return;
    }

    // אם הלייק לא קיים, מוסיף אותו
    content.likes.push(req.user.id);
    await content.save();

    res.json({
      message: "Like added.",
      likesCount: content.likes.length, // החזרת רק את מספר הלייקים
      content: content,
    });
  } catch (error) {
    // טיפול בשגיאות במידה ויש
    res.status(500).json({ message: "Internal server error" });
  }
});

// כל התכנים הסטטיים
router.get("/zodiac", (req, res, next) => {
  try {
    if (Object.keys(zodiacArticels).length === 0) {
      return res.status(404).send("Articles not found.");
    }
    res.json(zodiacArticels);
  } catch (error) {
    next(error); // מעביר את השגיאה למידלוואר השגיאות
  }
});

// תכנים סטטים לפי מזל נבחר | אופציונלי, לא נעשה בו שימוש בצד לקוח

router.get("/zodiac/:zodiacName", async (req, res, next) => {
  try {
    // בדיקה אם הנתונים קיימים
    if (!zodiacArticels || Object.keys(zodiacArticels).length === 0) {
      res.status(500).json({ message: "Database error: zodiac data missing." });
      return;
    }

    const zodiacName = req.params.zodiacName.toLowerCase(); // מוודא שהשם לא רגיש לאותיות רישיות

    // בודק אם המזל קיים במאגר
    const zodiac = zodiacArticels[zodiacName];

    if (!zodiac) {
      res.status(404).json({ message: "מזל לא נמצא" });
      return;
    }

    res.json(zodiac);
  } catch (error) {
    next(error); // מעביר את השגיאה לטיפול ב-Middleware של השגיאות
  }
});

module.exports = router;
