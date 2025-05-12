import Btn from "./btn";

function Product({
  price,
  name,
  category,
  description,
  image: { alt, url },
  quantityInStock,
  createdAt,
  goToProduct,
  isProductPage = false,
  addToCart,
}) {
  const handleCardClick = (e) => {
    // אם המשתמש לחץ על כפתור בתוך הכרטיס, לא נבצע ניווט
    if (e.target.closest("button")) return;
    goToProduct?.();
  };

  return (
    <div
      className={
        isProductPage
          ? "product-card shadow p-3 mb-4 rounded"
          : "product-card shadow p-3 mb-4 rounded cursor-pointer"
      }
      onClick={handleCardClick}
    >
      <div className="d-flex justify-content-center">
        <img
          src={url}
          alt={alt || name}
          className="img-fluid rounded mb-3 w-50"
        />
      </div>

      <div className="rtl">
        <h3 className="fw-bold">{name}</h3>
        <p className="text-muted">{category}</p>
      </div>

      <p className="text-truncate rtl">{description}</p>

      <div className="d-flex justify-content-between mt-3">
        <span className="fw-semibold">מחיר: ₪{price}</span>
        <span>במלאי: {quantityInStock}</span>
      </div>

      <small className="text-secondary d-block mt-2 rtl">
        תאריך הוספה: {createdAt}
      </small>

      {/* כפתור הוספה לסל */}
      <div className="d-flex">
        <Btn
          type="button"
          className={
            isProductPage
              ? "btn-success w-50 ms-auto"
              : "btn-success w-100 ms-auto"
          }
          description="הוסף לסל"
          fn={() => addToCart?.()}
        />
      </div>
    </div>
  );
}

export default Product;
