export function categoriesFn(products, category) {
  const productsByCatregory = products.filter(
    (product) => product.category === category
  );

  return productsByCatregory;
}
