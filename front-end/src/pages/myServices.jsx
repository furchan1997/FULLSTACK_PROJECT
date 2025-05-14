import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import Btn from "../components/btn";
import { useFormik } from "formik";
import joi from "joi";
import userService from "../services/userService";
import { useEffect, useState } from "react";
import HoroscopsCard from "../components/horoscopCard";

function MyServices() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useFormik({
    validateOnMount: false,

    initialValues: {
      firstName: "",
      phone: "",
      info: "",
    },

    validate(values) {
      const schema = joi.object({
        firstName: joi.string().min(2).max(256).required().messages({
          "string.base": "שם חייב להיות טקסט.",
          "string.empty": "השדה של השם לא יכול להיות ריק.",
          "string.min": "השם חייב להכיל לפחות 2 תווים.",
          "string.max": "השם יכול להכיל עד 256 תווים בלבד.",
          "any.required": "שדה השם הוא שדה חובה.",
        }),
        phone: joi.string().min(9).max(11).required().messages({
          "string.empty": "השדה של הנייד לא יכול להיות ריק.",
          "string.min": "מספר הטלפון חייב להיות באורך של לפחות 9 תווים.",
          "string.max": "מספר הטלפון יכול להיות באורך של עד 11 תווים בלבד.",
          "string.pattern.base":
            "מספר הטלפון חייב להיות תקין לפי פורמט ישראלי.",
        }),
        info: joi.string().min(20).max(1256).required().messages({
          "string.base": "תיאור הבקשה חייב להיות טקסט.",
          "string.empty": "שדה הבקשה לא יכול להיות ריק.",
          "string.min": "שדה הבקשה חייב להכיל לפחות 20 תווים.",
          "string.max": "שדה הבקשה יכול להכיל עד 1256 תווים בלבד.",
          "any.required": "שדה הבקשה הוא שדה חובה.",
        }),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      let errors = {};

      if (!error) return null;
      for (const detail of error.details) {
        const path = detail.path[0];
        errors[path] = detail.message;
      }

      return errors;
    },

    async onSubmit(values) {
      setLoading(true);
      try {
        const response = await userService.createContact(values);
        if (response.status === 201) {
          setMessage("success");
          form.resetForm();
        }
      } catch (err) {
        console.log(err);
        setError(
          err?.response?.data?.message || err?.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    console.log(message);
  }, [message]);

  const navigate = useNavigate();

  const handleClike = (serviceType) => {
    navigate(serviceType);
  };

  return (
    <div
      data-page="my-services"
      className="container book-frame d-flex flex-column align-items-center rtl color-my-services-text w-100"
    >
      <h1 className=" fw-bold">✨ עדניק – הכוונה רוחנית מדויקת מהלב ✨</h1>
      <h2 className="color-my-services-text fw-bold">
        טארוט | נומרולוגיה | אסטרולוגיה | ניקוי אנרגטי | פיתוח אישי
      </h2>

      <p className="color-my-services-text">
        <strong>ברוכה הבאה ♥</strong> <br />
        אני עדן בן אור, מתקשרת, פותחת בקלפים, יועצת רוחנית ומלווה נשים וגברים
        במסע לגילוי עצמי, קבלת החלטות והגשמה אישית. השליחות שלי היא לעזור לך
        להתחבר לעצמך, להבין את המסר שבמצב שבו את נמצאת – ולמצוא את הדרך לשחרור,
        צמיחה ושפע.
      </p>

      <p>
        מאז ילדותי אני חשה חיבור עמוק לעולמות הרוח. בעזרת כלים כמו טארוט,
        אסטרולוגיה, נומרולוגיה, פירוש מסרים וניקוי אנרגטי – אני מציעה תהליכים
        אישיים שמחברים אותך למי שאת באמת.
      </p>

      <h3>💬 באיזה שלב את נמצאת? בחרי את הדרך שמתאימה לך עכשיו:</h3>
      <p>
        🔮 עזרה מיידית | פתיחה בקלפים קיבלת מסרים סותרים? מרגישה בלבול מול קשר
        או סיטואציה מסוימת? הקלפים שלי יעזרו לך לראות בבירור את התמונה – להבין
        מה עובר על הצד השני, מה חוסם אותך, ומה הצעד הנכון הבא.
      </p>
      <div
        className="custom-bg-gold fs-5 text-center p-2"
        style={{ borderRadius: "20px" }}
      >
        <strong className="custom-purple-color">
          <span
            onClick={() => handleClike("/My-services/openin-cards")}
            className="cursor-pointer"
          >
            קראי עוד על פתיחה בקלפים ›
          </span>
        </strong>
      </div>

      <div className="my-3">
        <h3>🌠 פיתוח אישי | אסטרולוגיה ונומרולוגיה</h3>
        <p>
          מפה אסטרולוגית מדויקת תפתח לך חלון עמוק לעצמך – תגלי מה הייעוד שלך,
          מהם הכוחות שקיבלת, ומהם השיעורים שהיקום מזמן לך. מתאים במיוחד לפני
          החלטות גדולות, פרויקטים, התחלת קשרים או כשאת מרגישה תקועה.
        </p>
      </div>

      <div
        className="custom-bg-gold fs-5 text-center p-2"
        style={{ borderRadius: "20px" }}
      >
        <strong className="custom-purple-color">
          <span
            onClick={() => handleClike("/My-services/Astrological-map")}
            className="cursor-pointer"
          >
            גילוי עצמי דרך מפה אסטרולוגית ›
          </span>
        </strong>
      </div>

      <div className="my-3">
        <h3>🧘‍♀ הגנות ושחרורים | ניקוי אנרגטי</h3>
        <p>
          מרגישה עייפות לא מוסברת? תחושת עומס או "עין"? הגיע הזמן לנקות את
          האנרגיה. בטיפול בעופרת ובתדרים טיבטיים נאזן את ההילה, נשחרר מטען רגשי
          ונחזיר את האור.
        </p>
      </div>

      <div
        className="custom-bg-gold fs-5 text-center p-2"
        style={{ borderRadius: "20px" }}
      >
        <strong className="custom-purple-color">
          <span
            onClick={() => handleClike("/My-services/Lead-cleaning")}
            className="cursor-pointer"
          >
            ניקוי בעופרת וקערות טיבטיות ›
          </span>
        </strong>
      </div>

      <div className="my-3">
        <h3>💖 רוצה להתחיל תהליך או לשאול שאלה?</h3>
        <p>
          אפשר לשלוח לי הודעה <strong>בוואטסאפ</strong> או למלא את הטופס הקצר
          כאן למטה – אני אחזור אלייך בהקדם באהבה 💌
        </p>

        <h4>
          <a
            href="https://wa.me/972524513043"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success mt-2"
          >
            לחצי כאן לשליחת הודעת וואטסאפ
          </a>
        </h4>
      </div>
      <div className="w-100">
        {loading ? (
          <>
            <p>המתן/י בבקשה...</p>
          </>
        ) : message === "success" ? (
          <>
            <p>ההודעה נשלחה בהצלחה, אחזור אלייך בהקדם, תודה לך 😉</p>
          </>
        ) : (
          <>
            <form
              onSubmit={form.handleSubmit}
              noValidate
              autoComplete="off"
              id="form"
            >
              {error && <div className="alert alert-danger"> {error}</div>}
              <Input
                label={"שם מלא"}
                type={"text"}
                name={"firstName"}
                id={"firstName"}
                required
                {...form.getFieldProps("firstName")}
                error={form?.touched?.firstName && form?.errors?.["firstName"]}
              />
              <Input
                label={"פלאפון"}
                type={"text"}
                name={"phone"}
                id={"phone"}
                required
                {...form.getFieldProps("phone")}
                error={form?.touched?.phone && form?.errors?.["phone"]}
              />
              <Input
                label={"בקשתך?"}
                type="textarea"
                name={"info"}
                id={"info"}
                required
                {...form.getFieldProps("info")}
                error={form?.touched?.info && form?.errors?.["info"]}
              />
              <Btn
                type={"submit"}
                description={"שלח/י"}
                className="custom-bg-purple custom-gold-color w-25"
                disabled={!form?.isValid}
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default MyServices;
