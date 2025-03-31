import Input from "../../components/input";
import Btn from "../../components/btn";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import joi from "joi";
import { useContent } from "../../context/contents.context";

// רכיב עבור עריכת תוכן , יחד עם ניהול טפסים עם פורמיק וניהול ולידציות עם ג'וי
// את הבקשה לשרת עם הערכים שבטופס והמזהה של התוכן הקיים מקבל מהקונטקטס

function UpdateHoroscop() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { updateHoroscop, horoscop, getHoroscop, error, loading } =
    useContent();

  useEffect(() => {
    getHoroscop(id);
  }, [id]);

  useEffect(() => {}, [horoscop]);

  // הגדרת ה-formik אחרי שהנתונים נטענו
  const form = useFormik({
    enableReinitialize: true,
    validateOnMount: true,

    initialValues: {
      sign: horoscop?.sign || "",
      title: horoscop?.title || "",
      subtitle: horoscop?.subtitle || "",
      description: horoscop?.description || "",
      image: {
        url: horoscop?.image?.url || "",
        alt: horoscop?.image?.alt || "",
      },
    },
    validate(values) {
      const schema = joi.object({
        sign: joi.string().min(2).max(256).required(),
        title: joi.string().min(2).max(256).required(),
        subtitle: joi.string().min(2).max(256).required(),
        description: joi.string().min(2).max(1024).required(),
        image: joi.object().keys({
          url: joi.string().uri().allow("").default(""),
          alt: joi.string().min(2).max(256).required(),
        }),
      });

      const { error } = schema.validate(values, { abortEarly: false });

      if (!error) return null;

      let errors = {};

      for (const detail of error.details) {
        const path = detail.path.join(".");
        errors[path] = detail.message;
      }

      return errors;
    },
    async onSubmit(values) {
      await updateHoroscop(id, values);
      navigate(`/horoscops/${id}`);
    },
  });

  if (loading || !horoscop) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <p>Update Horoscop</p>

      <div className="container-fluid d-flex justify-content-center">
        <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
          {error && <div className="alert alert-danger">ERROR: {error}</div>}

          <div className="row">
            <div className="col-12 col-md-6 col-sm-4">
              <Input
                label={"sign"}
                name={"sign"}
                type={"text"}
                id={"sign"}
                required
                error={form.touched?.sign && form.errors["sign"]}
                {...form.getFieldProps("sign")}
              />

              <Input
                label={"title"}
                name={"title"}
                type={"textarea"}
                id={"title"}
                required
                error={form.touched?.title && form.errors["title"]}
                {...form.getFieldProps("title")}
              />

              <Input
                label={"subtitle"}
                name={"subtitle"}
                type={"textarea"}
                id={"subtitle"}
                required
                error={form.touched?.subtitle && form.errors["subtitle"]}
                {...form.getFieldProps("subtitle")}
              />

              <Input
                label={"description"}
                name={"description"}
                type={"textarea"}
                id={"description"}
                required
                error={form.touched?.description && form.errors["description"]}
                {...form.getFieldProps("description")}
              />

              <Input
                label={"Url"}
                name={"image.url"}
                type={"textarea"}
                id={"url"}
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
                type={"submit"}
                className="custom-bg-purple custom-gold-color"
                description={"Update Horoscop"}
                disabled={!form.isValid}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateHoroscop;
