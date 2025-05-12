import { useEffect } from "react";
import { useProduct } from "../../context/products.context";

function AllProducts() {
  const { getProducts, products } = useProduct();
  useEffect(() => {
    getProducts();ז
  }, []);

  console.log(products);
  return <div>All products</div>;
}

export default AllProducts;
