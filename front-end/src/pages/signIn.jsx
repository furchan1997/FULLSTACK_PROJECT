import PageHeaders from "../components/common/pageHeaders";
import Logo from "../components/logo";
import Input from "../components/input";
import Btn from "../components/btn";
import { useFormik } from "formik";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import joi from "joi";
import { passwordRegex } from "../../regex";

function SignIn() {
  const { user, logIn } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const form = useFormik({
    validateOnMount: false,

    initialValues: {
      email: "",
      password: "",
    },

    validate(values) {
      const schema = joi.object({
        email: joi
          .string()
          .email({ tlds: { allow: false } })
          .required(),
        password: joi
          .string()
          .min(8)
          .pattern(passwordRegex)
          .messages({
            "string.pattern.base":
              "הסיסמה חייבת להכיל לפחות 8 תווים, כולל אות גדולה, אות קטנה, 4 ספרות וסימן מיוחד.",
            "string.empty": "שדה הסיסמה לא יכול להיות ריק",
          })
          .required(),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      let errors = {}; // אובייקט לשמירת שגיאות

      // אם אין שגיאות, מחזירים null
      if (!error) return null;

      // אם יש שגיאות, ממלאים את אובייקט השגיאות
      for (const detali of error.details) {
        const path = detali.path; // מסלול השדה שגרם לשגיאה
        errors[path] = detali.message; // הודעת השגיאה
      }
      return errors; // מחזירים את אובייקט השגיאות
    },

    async onSubmit(values) {
      try {
        setLoading(true);
        await logIn(values);
      } catch (err) {
        setError(
          err?.response?.data?.message || err?.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    },
  });
  //  מבצע ניווט אוטומטי לדף הראשי ("/") כאשר המשתמש מחובר (user קיים).
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHeaders
        title={
          <>
            sign-in <Logo />
          </>
        }
      />

      <div className="container d-flex justify-content-center gap-5">
        <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
          {error && <div className="alert alert-danger">Error: {error}</div>}

          <Input
            label={"email"}
            name={"email"}
            type={"email"}
            id={"email"}
            required
            {...form.getFieldProps("email")}
            error={form?.touched?.email && form?.errors["email"]} // הצגת השגיאה רק אם השדה טופל ויש שגיאה
          />
          <Input
            label={"password"}
            name={"password"}
            type={"password"}
            id={"password"}
            required
            {...form.getFieldProps("password")}
            error={form?.touched?.password && form?.errors["password"]} // הצגת השגיאה רק אם השדה טופל ויש שגיאה
          />

          <Btn
            type={"submit"}
            className="custom-bg-purple custom-gold-color"
            description={"Sign-in"}
            disabled={!form?.isValid}
          />
        </form>
        <div className="d-flex flex-column">
          <p>No have account?</p>
          <Btn
            type={"button"}
            className="custom-bg-gold custom-purple-color"
            description={"click"}
            fn={handleSignUp}
          />
        </div>
      </div>
    </>
  );
}

export default SignIn;
