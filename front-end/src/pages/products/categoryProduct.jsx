import { useProduct } from "../../context/products.context";
import { useParams } from "react-router-dom";
import { categoriesFn } from "../../components/common/filterdProducts";
import { useEffect, useState } from "react";
import Product from "../../components/product";
import { useNavigate } from "react-router-dom";

function CategoryProduct() {
  const { category } = useParams();
  const { products, getProducts, error, loading } = useProduct();
  const [categoryProduct, setCategoryProduct] = useState([]);

  const navigate = useNavigate();

  // טוען מוצרים פעם אחת בלבד
  useEffect(() => {
    getProducts();
  }, []);

  // מסנן מוצרים אחרי שנטענו
  useEffect(() => {
    if (!loading && products?.length && category) {
      const filtered = categoriesFn(products, category);

      setCategoryProduct(filtered);
    }
  }, [loading, products, category]);

  const handleClickToProduct = (ID) => {
    navigate(`/shop/products/item/${ID}`);
  };

  if (loading) {
    return (
      <div className="container rtl">
        <p className="fw-bold fs-1 text-center">טוען...</p>{" "}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container rtl">
        <p className="fw-bold fs-1 text-center">שגיאה: {error}</p>{" "}
        {/* מציג שגיאה אם ישנה בעיה */}
      </div>
    );
  }

  if (!categoryProduct || !products) {
    return (
      <div className="container rtl">
        <p className="fw-bold fs-3 text-center">
          אין מוצרים זמינים בקטגוריה הזו, נסו שוב מאוחר יותר
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row g-4 justify-content-center my-3">
        {categoryProduct.map((product) => (
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

export default CategoryProduct;
