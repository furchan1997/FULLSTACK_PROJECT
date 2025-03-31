import Input from "../../components/input";
import Btn from "../../components/btn";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import { useContent } from "../../context/contents.context";

// רכיב עבור יצירת תוכן חדש , יחד עם ניהול טפסים עם פורמיק וניהול ולידציות עם ג'וי
// את הבקשה לשרת עם הערכים שבטופס מקבל מהקונטקטס

function CreateHoroscop() {
  const navigate = useNavigate();
  const { error, loading, createHoroscop } = useContent();

  const form = useFormik({
    validateOnMount: true,

    initialValues: {
      sign: "",
      title: "",
      subtitle: "",
      description: "",
      image: {
        url: "https://r2.starryai.com/results/907419597/93bf1e0e-4ec4-4644-8abd-685cfbba7a17.webp",
        alt: "default image",
      },
    },

    validate(values) {
      const schema = joi.object({
        sign: joi.string().min(2).max(256).required(),
        title: joi.string().min(2).max(256).required(),
        subtitle: joi.string().min(2).max(1024).required(),
        description: joi.string().min(2).max(1024).required(),
        image: joi.object().keys({
          url: joi.string().uri().allow("").default(""),
          alt: joi.string().min(2).max(256).required(),
        }),
      });

      const { error } = schema.validate(values, { abortEarly: false });

      if (!error) return {};

      let errors = {};

      for (const detail of error.details) {
        const path = detail.path.join(".");
        errors[path] = detail.message;
      }

      return errors;
    },

    async onSubmit(values) {
      await createHoroscop(values);
      navigate("/horoscops");
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: {error}</div>;
  }

  return (
    <>
      <div className="container">
        <p>Create Horoscope</p>
        <div className="container d-flex justify-content-center">
          <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
            {error && <div className="alert alert-danger">ERROR: {error}</div>}

            <Input
              label="Sign"
              name="sign"
              type="text"
              id="sign"
              required
              error={form.touched.sign && form.errors.sign}
              {...form.getFieldProps("sign")}
            />

            <Input
              label="Title"
              name="title"
              type="textarea"
              id="title"
              required
              error={form.touched.title && form.errors.title}
              {...form.getFieldProps("title")}
            />

            <Input
              label="Subtitle"
              name="subtitle"
              type="textarea"
              id="subtitle"
              required
              error={form.touched.subtitle && form.errors.subtitle}
              {...form.getFieldProps("subtitle")}
            />

            <Input
              label="Description"
              name="description"
              type="textarea"
              id="description"
              required
              error={form.touched.description && form.errors.description}
              {...form.getFieldProps("description")}
            />

            <Input
              label="Url"
              name="image.url"
              type="textarea"
              id="url"
              required
              error={form.touched?.image?.url && form.errors["image.url"]}
              {...form.getFieldProps("image.url")}
            />

            <Input
              type="text"
              label="Image alt"
              id="alt"
              name="image.alt"
              error={form.touched?.image?.alt && form.errors["image.alt"]}
              {...form.getFieldProps("image.alt")}
            />

            <Btn
              type="submit"
              className="custom-bg-purple custom-gold-color"
              description="Create Horoscope"
              disabled={!form.isValid}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateHoroscop;
