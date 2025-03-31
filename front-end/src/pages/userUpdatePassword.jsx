import Input from "../components/input";
import { useFormik } from "formik";
import Btn from "../components/btn";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import joi from "joi";
import { passwordRegex } from "../../regex.js";

// רכיב עבור עידכון סיסמא

function ChangeUserPassword() {
  const navigate = useNavigate();
  const { logOut, updateUserPassword, loading, error } = useAuth(); // מביא את המידע עבור משתמש יחד עם פונקציה של עדכון סיסמא מהקונטקסט של ניהול משתמשים + פונקציית יציאה וניקוי הטוקן שלו לצורך אבטחה וסדר

  const form = useFormik({
    validateOnMount: true,

    initialValues: {
      password: "",
    },
    validate(values) {
      const schema = joi.object({
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
      if (!error) return null;

      let errors = {};

      for (const detali of error.details) {
        const path = detali.path;
        errors[path] = detali.message;
      }

      return errors;
    },

    async onSubmit(value) {
      try {
        await updateUserPassword(value);
        navigate("/sign-in");
        logOut();
      } catch (err) {
        if (err) return;
      }
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <h3>Change password:</h3>

        <div className="d-flex m-auto justify-content-center align-items-center">
          <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
            {error && <div className="alert alert-danger">{error}</div>}
            <Input
              label={"password"}
              name={"password"}
              type={"password"}
              id={"password"}
              required
              {...form.getFieldProps("password")}
              error={form.touched?.password && form.errors["password"]}
            />

            <Btn
              type={"submit"}
              className="custom-bg-purple custom-gold-color"
              description={"update"}
              disabled={!form.isValid || form.isSubmitting}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangeUserPassword;
