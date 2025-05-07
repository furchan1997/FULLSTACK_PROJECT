import Input from "../components/input";
import Btn from "../components/btn";
import PageHeaders from "../components/common/pageHeaders";
import { useFormik } from "formik";
import Logo from "../components/logo";
import { useAuth } from "../context/auth.context";
import { useNavigate, useParams } from "react-router-dom";
import joi from "joi";

// רכיב עבור עריכת פרטי משתמש מלבד סיסמא
function UserUpdate() {
  const { userUpdate, userDetalis, loading, error } = useAuth(); // מביא את המידע עבור משתמש יחד עם פונקציה של עריכת משתמש מהקונטקסט של ניהול משתמשים
  const navigate = useNavigate();
  const { id } = useParams();

  // פונקציית ניווט עבור שינוי סיסמא
  const handleUpdatePassword = (ev) => {
    ev.preventDefault();
    navigate(`/change-password/${id}`);
  };

  const form = useFormik({
    validateOnMount: true,
    // הפרטים הנוכחיים של אותו משתמש שמבקש לערוך , לצורך נוחות
    initialValues: {
      firstName: userDetalis.firstName || "",
      lastName: userDetalis.lastName || "",
      email: userDetalis.email || "",
      phone: userDetalis.phone || "",
      address: {
        state: userDetalis.address?.state || "",
        country: userDetalis.address?.country || "",
        city: userDetalis.address?.city || "",
        street: userDetalis.address?.street || "",
        houseNumber: userDetalis.address?.houseNumber || "",
        zip: userDetalis.address?.zip || "",
      },
    },

    // סכמה של ג'וי
    validate(values) {
      const schema = joi.object({
        firstName: joi.string().min(2).max(256).required(),
        lastName: joi.string().min(2).max(256).required(),
        email: joi
          .string()
          .email({ tlds: { allow: false } })
          .required(),
        phone: joi.string().min(9).max(11).required().messages({
          "string.min": "מספר הטלפון חייב להיות באורך של לפחות 9 תווים.",
          "string.max": "מספר הטלפון יכול להיות באורך של עד 11 תווים בלבד.",
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
      let errors = {};

      if (!error) return null;

      for (const detali of error.details) {
        const path = detali.path.join(".");
        errors[path] = detali.message;
      }
      return errors;
    },

    // פונקציה א-סינכרונית שקוראת לפונקציה שמנצאת בקונטקסט עבור בקשה לשרת לשינוי פרטים יחד עם הערכים שמתקבלים בטופס
    async onSubmit(values) {
      try {
        await userUpdate(values);
        navigate("/");
      } catch (err) {
        if (err) {
          return;
        }
      }
    },
  });

  if (loading) {
    return <div>טוען...</div>;
  }

  return (
    <>
      <PageHeaders
        title={
          <>
            עדכון פרטים <Logo />
          </>
        }
        description={"כאן ניתן לעדכן את פרטיך האישיים ללא צורך בסיסמה"}
      />

      <div className="container d-flex justify-content-center">
        <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
          {error && <div className="alert alert-danger">שגיאה: {error}</div>}

          <Input
            label={"שם פרטי"}
            name={"firstName"}
            type={"text"}
            id={"firstName"}
            {...form.getFieldProps("firstName")}
            error={form.touched?.firstName && form.errors["firstName"]}
          />
          <Input
            label={"שם משפחה"}
            name={"lastName"}
            type={"text"}
            id={"lastName"}
            required
            {...form.getFieldProps("lastName")}
            error={form.touched?.lastName && form.errors["lastName"]}
          />
          <Input
            label={"אימייל"}
            name={"email"}
            type={"email"}
            id={"email"}
            required
            {...form.getFieldProps("email")}
            error={form.touched?.email && form.errors["email"]}
          />
          <Input
            label={"טלפון"}
            name={"phone"}
            type={"text"}
            id={"phone"}
            required
            {...form.getFieldProps("phone")}
            error={form.touched?.phone && form.errors["phone"]}
          />
          <Input
            label={"אזור / מדינה"}
            name={"state"}
            type={"text"}
            id={"state"}
            {...form.getFieldProps("address.state")}
            error={form.touched?.address?.state && form.errors["address.state"]}
          />
          <Input
            label={"מדינה"}
            name={"country"}
            type={"text"}
            id={"country"}
            {...form.getFieldProps("address.country")}
            error={
              form.touched?.address?.country && form.errors["address.country"]
            }
          />
          <Input
            label={"עיר"}
            name={"city"}
            type={"text"}
            id={"city"}
            {...form.getFieldProps("address.city")}
            error={form.touched.address?.city && form.errors["address.city"]}
          />
          <Input
            label={"רחוב"}
            name={"street"}
            type={"text"}
            id={"street"}
            {...form.getFieldProps("address.street")}
            error={
              form.touched.address?.street && form.errors["address.street"]
            }
          />
          <Input
            label={"מספר בית"}
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
            label={"מיקוד"}
            name={"zip"}
            type={"number"}
            id={"zip"}
            {...form.getFieldProps("address.zip")}
            error={form.touched.address?.zip && form.errors["address.zip"]}
          />

          <div className="d-flex gap-1">
            <Btn
              type={"submit"}
              className="custom-bg-purple custom-gold-color"
              description={"עדכנ/י"}
              disabled={!form.isValid}
            />

            <Btn
              className="custom-bg-gold custom-purple-color"
              description={"עדכנ/י סיסמה"}
              fn={handleUpdatePassword}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default UserUpdate;
