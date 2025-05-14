import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../context/products.context";
import { useEffect } from "react";
import Product from "../../components/product";
import alertDeleting from "../../components/common/alertDeleting";

function SingleProduct() {
  const { getProduct, product, deleteProduct, error, loading } = useProduct();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteClick = async (ID) => {
    const confirmd = await alertDeleting(() => deleteProduct(ID));
    if (confirmd) {
      navigate("/shop/");
    } else {
      getProduct(id);
    }
  };

  useEffect(() => {
    getProduct(id);
    console.log(product);
  }, [id]);

  if (error) {
    return (
      <div className="rtl">
        <p>שגיאה: {error}</p> {/* מציג שגיאה אם ישנה בעיה */}
      </div>
    );
  }

  if (loading) {
    return <p>טוען...</p>;
  }

  return (
    <div className="container my-3 w-50">
      <Product
        deleteBtn={() => {
          handleDeleteClick(product?._id);
        }}
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
