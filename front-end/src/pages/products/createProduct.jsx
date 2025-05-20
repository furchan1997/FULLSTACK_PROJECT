import Btn from "../../components/btn";
import Input from "../../components/input";
import { Formik, useFormik } from "formik";
import { useProduct } from "../../context/products.context";
import joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "../../components/select";

function CreateProduct() {
  const { createProduct, loading, error, getCategories, categories } =
    useProduct();
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      name: "מוצר",
      description: "מוצר",
      image: {
        url: "https://r2.starryai.com/results/907419597/93bf1e0e-4ec4-4644-8abd-685cfbba7a17.webp",
        alt: "מוצר",
      },
      price: "150",
      category: "קמעות",
      quantityInStock: "10",
    },

    validate(values) {
      const schema = joi.object({
        name: joi.string().min(2).max(256).required(),
        description: joi.string().min(10).max(256).required(),
        image: joi.object().keys({
          url: joi.string().uri().allow("").default(""),
          alt: joi.string().min(2).max(256).required(),
        }),
        price: joi.number().min(2).max(1024).required(),
        category: joi.string().min(2).max(1024).required(),
        quantityInStock: joi.number().min(1).required(),
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

    async onSubmit(value) {
      const success = await createProduct(value);
      if (success) {
        navigate("/shop");
      }
    },
  });

  if (loading) {
    return (
      <div className="container rtl">
        <p className="fw-bold fs-1 text-center">טוען...</p>{" "}
      </div>
    );
  }

  return (
    <div className="container">
      <p className="fs-1 fw-bold text-center">Create product</p>
      <div className="w-75 w-md-50 m-auto d-flex flex-column">
        <form onSubmit={form.handleSubmit} autoComplete="off" noValidate>
          {error && <div className="alert alert-danger">Error: {error}</div>}

          <Input
            label={"שם מוצר"}
            type={"text"}
            id="name"
            name="name"
            {...form.getFieldProps("name")}
            error={form.touched.name && form.errors.name}
            required
          />
          <Input
            label={"תיאור מוצר"}
            type="textarea"
            id="description"
            name="description"
            {...form.getFieldProps("description")}
            error={form.touched.description && form.errors.description}
            required
          />

          <Select
            label={"בחרי מוצר"}
            name={"category"}
            option={categories}
            error={form.touched.category && form.errors.category}
            {...form.getFieldProps("category")}
          />

          <Input
            label={"מחיר"}
            type={"text"}
            id="price"
            name="price"
            {...form.getFieldProps("price")}
            error={form.touched.price && form.errors.price}
            required
          />
          <Input
            label={"תמונה"}
            type={"text"}
            id="url"
            name="image.url"
            {...form.getFieldProps("image.url")}
            error={form.touched.image?.url && form.errors.image?.url}
            required
          />
          <Input
            label={"תיאור תמונה"}
            type={"text"}
            id="alt"
            name="image.alt"
            {...form.getFieldProps("image.alt")}
            error={form.touched.image?.alt && form.errors.image?.alt}
            required
          />
          <Input
            label={"כמות"}
            type={"number"}
            id="quantityInStock"
            name="quantityInStock"
            {...form.getFieldProps("quantityInStock")}
            error={form.touched.quantityInStock && form.errors.quantityInStock}
            required
          />

          <div className="d-flex flex-column">
            <Btn
              type={"submit"}
              className="custom-bg-purple custom-gold-color ms-auto"
              description={"צרי מוצר חדש"}
              disabled={!form.isValid}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
