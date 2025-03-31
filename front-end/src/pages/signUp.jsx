import Btn from "../components/btn";
import PageHeaders from "../components/common/pageHeaders";
import Input from "../components/input";
import Logo from "../components/logo";
import { useFormik } from "formik";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import joi from "joi";
import { passwordRegex } from "../../regex";
// רכיב עבור הרשמה של משתמש חדש
function SignUp() {
  const { signUp } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  const form = useFormik({
    validateOnMount: true,

    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
      },
    },

    validate(values) {
      const schema = joi.object({
        firstName: joi.string().min(2).max(256).required(),
        lastName: joi.string().min(2).max(256).required(),
        email: joi
          .string()
          .email({ tlds: { allow: false } })
          .required(),
        password: joi
          .string()
          .min(8)
          .messages({
            "string.pattern.base":
              "הסיסמה חייבת להכיל לפחות 8 תווים, כולל אות גדולה, אות קטנה, 4 ספרות וסימן מיוחד.",
            "string.empty": "שדה הסיסמה לא יכול להיות ריק",
          })
          .pattern(passwordRegex)
          .required(),
        phone: joi.string().min(9).max(11).required().messages({
          "string.min": "מספר הטלפון חייב להיות באורך של לפחות 9 תווים.",
          "string.max": "מספר הטלפון יכול להיות באורך של עד 11 תווים בלבד.",
          "string.pattern.base":
            "מספר הטלפון חייב להיות תקין לפי פורמט ישראלי.",
        }),

        address: joi
          .object({
            state: joi
              .string()
              .min(2)
              .max(256)
              .optional()
              .allow("")
              .default(""),
            country: joi.string().min(2).max(256).required(),
            city: joi.string().min(2).max(256).required(),
            street: joi.string().min(2).max(256).required(),
            houseNumber: joi.number().required(),
            zip: joi.number().required(),
          })
          .required(),
      });

      const { error } = schema.validate(values, { abortEarly: false });

      let errors = {}; // אובייקט לשמירת שגיאות

      // אם אין שגיאות, מחזירים אובייקט ריק
      if (!error) return {};

      // אם יש שגיאות, ממלאים את אובייקט השגיאות
      for (const detali of error.details) {
        const path = detali.path.join("."); // מסלול השדה שגרם לשגיאה
        errors[path] = detali.message; // הודעת השגיאה
      }
      return errors;
    },

    async onSubmit(values) {
      try {
        setLoading(true);

        await signUp(values);
        navigate("/sign-in");
      } catch (err) {
        setError(
          err?.response?.data?.message || err?.message || "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHeaders
        title={
          <>
            Sign-up <Logo />
          </>
        }
        description={
          "Sign up for the app today to receive the highest quality, most up-to-date, and most interesting content. It's free!"
        }
      />

      <div className="container d-flex justify-content-center">
        <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
          {error && <div className="alert alert-danger">{error}</div>}
          <Input
            {...form.getFieldProps("firstName")}
            error={form.touched?.firstName ? form.errors?.firstName : ""}
            label={"First Name"}
            name={"firstName"}
            type={"text"}
            id={"firstName"}
            required
          />
          <Input
            label={"Last Name"}
            name={"lastName"}
            type={"text"}
            id={"lastName"}
            required
            {...form.getFieldProps("lastName")}
            error={form.touched?.lastName && form.errors["lastName"]}
          />
          <Input
            label={"email"}
            name={"email"}
            type={"email"}
            id={"email"}
            required
            {...form.getFieldProps("email")}
            error={form.touched?.email && form.errors["email"]}
          />
          <Input
            label={"password"}
            name={"password"}
            type={"password"}
            id={"password"}
            required
            {...form.getFieldProps("password")}
            error={form.touched?.password && form.errors["password"]}
          />
          <Input
            label={"phone"}
            name={"phone"}
            type={"text"}
            id={"phone"}
            required
            {...form.getFieldProps("phone")}
            error={form.touched?.phone && form.errors["phone"]}
          />
          <Input
            label={"state"}
            name={"address.state"}
            type={"text"}
            id={"state"}
            {...form.getFieldProps("address.state")}
            error={form.touched.address?.state && form.errors["address.state"]}
          />
          <Input
            label={"country"}
            name={"address.country"}
            type={"text"}
            id={"country"}
            {...form.getFieldProps("address.country")}
            error={
              form.touched.address?.country && form.errors["address.country"]
            }
          />
          <Input
            label={"city"}
            name={"city"}
            type={"text"}
            id={"city"}
            {...form.getFieldProps("address.city")}
            error={form.touched.address?.city && form.errors["address.city"]}
          />
          <Input
            label={"street"}
            name={"street"}
            type={"text"}
            id={"street"}
            {...form.getFieldProps("address.street")}
            error={
              form.touched.address?.street && form.errors["address.street"]
            }
          />
          <Input
            label={"House Number"}
            name={"houseNumber"}
            type={"number"}
            id={"houseNumber"}
            {...form.getFieldProps("address.houseNumber")}
            error={
              form.touched.address?.houseNumber &&
              form.errors["address.houseNumber"]
            }
          />
          <Input
            label={"zip"}
            name={"zip"}
            type={"number"}
            id={"zip"}
            {...form.getFieldProps("address.zip")}
            error={form.touched.address?.zip && form.errors["address.zip"]}
          />
          <div className="d-flex gap-3 align-items-center">
            <Btn
              type={"submit"}
              className="custom-bg-purple custom-gold-color"
              description={"Sign-up"}
              disabled={!form.isValid}
            />

            <p className="m-0"> have account?</p>
            <Btn
              className="custom-bg-gold custom-purple-color"
              description={"click"}
              fn={handleSignIn}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
