import { createContext, useContext, useEffect, useState } from "react";
import * as productService from "../services/productService.js";

export const ProductContext = createContext();
ProductContext.displayName = "Product";

export function ProductProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  const handleError = (err) => {
    setError(
      err?.response?.data?.message || err?.message || "אירעה שגיאה כללית"
    );
  };

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await productService.getCategories();
      setCategories(response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getProducts();
      setProducts(response.data.products);
    } catch (err) {
      console.log(err);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (ID) => {
    setLoading(true);
    try {
      const response = await productService.getProduct(ID);
      setProduct(response?.data?.product);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async () => {};

  const updateProduct = async (ID) => {};

  const deleteProducts = async () => {};

  const deleteProduct = async (ID) => {
    setLoading(true);
    try {
      const response = await productService.deleteProduct(ID);
      return response.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        getCategories,
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProducts,
        deleteProduct,
        loading,
        error,
        products,
        product,
        categories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
