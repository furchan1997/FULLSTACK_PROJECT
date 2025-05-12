import { useParams } from "react-router-dom";
import { useProduct } from "../../context/products.context";
import { useEffect } from "react";
import Product from "../../components/product";

function SingleProduct() {
  const { getProduct, product } = useProduct();
  const { id } = useParams();

  useEffect(() => {
    getProduct(id);
  }, []);

  console.log(product);
  return (
    <div className="container my-3 w-50">
      <Product
        isProductPage
        image={{
          url: product?.image?.url,
          alt: product?.image?.alt || product?.name || "product image",
        }}
        name={product?.name}
        category={product?.category}
        description={product?.description}
        price={product?.price}
        quantityInStock={product?.quantityInStock}
        createdAt={product?.createdAt}
        addToCart
      />
    </div>
  );
}

export default SingleProduct;
