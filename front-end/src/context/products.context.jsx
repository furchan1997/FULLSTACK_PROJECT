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

  const getCategories = async () => {
    try {
      const response = await productService.getCategories();
      setCategories(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const getProducts = async () => {
    try {
      const response = await productService.getProducts();
      setProducts(response.data.products);
    } catch (err) {
      setError(err);
    }
  };

  const getProduct = async (ID) => {
    try {
      const response = await productService.getProduct(ID);
      setProduct(response?.data?.product);
    } catch (err) {
      setError(err || err?.response?.message || err?.message);
    }
  };

  const createProduct = async () => {};

  const updateProduct = async (ID) => {};

  const deleteProducts = async () => {};

  const deleteProduct = async (ID) => {};

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
