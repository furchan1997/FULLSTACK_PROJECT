import { useEffect } from "react";
import { useProduct } from "../../context/products.context";
import Product from "../../components/product";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const { getProducts, products } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const handleClickToProduct = (ID) => {
    navigate(`/shop/products/${ID}`);
  };

  console.log(products);
  return (
    <div className="container">
      <div className="row g-4 justify-content-center my-3">
        {products.map((product) => (
          <div key={product?._id} className="col-md-4 col-sm-12">
            <Product
              goToProduct={() => {
                handleClickToProduct(product?._id);
              }}
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
