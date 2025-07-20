import httpService from "./httpService";

export async function getCategories() {
  return httpService.get("/shop/categories");
}

export async function getProducts() {
  return httpService.get("/shop/products");
}

export async function getProduct(ID) {
  return httpService.get(`/shop/products/${ID}`);
}

export async function createProduct(product) {
  return httpService.post("/shop/products/", product);
}

export async function updateProduct(ID, data) {
  return httpService.put(`/shop/products/${ID}`, data);
}

export async function deleteProducts() {
  return httpService.delete("/shop/products");
}

export async function deleteProduct(ID) {
  return httpService.delete(`/shop/products/${ID}`);
}

export const productService = {
  getCategories,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProducts,
  deleteProduct,
};

export default productService;
