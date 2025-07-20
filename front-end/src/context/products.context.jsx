import { createContext, useContext, useEffect, useState } from "react";
import productService from "../services/productService";

export const ProductContext = createContext();
ProductContext.displayName = "Product";

export function ProductProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  const handleError = (
    err,
    fallbackMessage = "אירעה שגיאה, נסה שנית מאוחר יותר"
  ) => {
    const message =
      err?.response?.data?.message || err?.message || fallbackMessage;

    setError(message);
    console.error("שגיאה:", message, err);

    // במקום לזרוק שגיאה, נחזיר false
    return false;
  };

  const getCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getCategories();
      console.log(response);
      setCategories(response.data);
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await productService.getProducts();
      setProducts(response.data.products);
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (ID) => {
    setLoading(true);
    setError(null);

    try {
      const response = await productService.getProduct(ID);
      setProduct(response?.data?.product);
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product) => {
    setLoading(true);
    setError(null);

    try {
      const response = await productService.createProduct(product);
      setProduct(response.data);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (ID, DATA) => {
    setLoading(true);
    setError(null);

    try {
      const response = await productService.updateProduct(ID, DATA);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await productService.deleteProducts();
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (ID) => {
    setLoading(true);
    setError(null);

    try {
      const response = await productService.deleteProduct(ID);
      return response.data;
    } catch (err) {
      return handleError(err);
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
        setError,
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
