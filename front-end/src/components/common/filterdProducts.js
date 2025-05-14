export function categoriesFn(products, category) {
  const normalizedCategory = category?.trim();
  return products.filter(
    (product) => product.category?.trim() === normalizedCategory
  );
}
