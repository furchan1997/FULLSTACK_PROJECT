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
  }, [id]);

  const handleUpdateClick = (ID) => {
    navigate(`/admin/update-product/${ID}`);
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

  return (
    <div className="container my-3 ">
      <Product
        isProductPage
        deleteBtn={() => {
          handleDeleteClick(product?._id);
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
        addToCart
        updateBtn={() => handleUpdateClick(product?._id)}
      />
    </div>
  );
}

export default SingleProduct;
