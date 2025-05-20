import { useEffect, useState } from "react";
import { useProduct } from "../../context/products.context";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/auth.context";
import Btn from "../../components/btn";
import alertDeleting from "../../components/common/alertDeleting";

function Shop() {
  const { getCategories, categories, deleteProducts, error, loading } =
    useProduct();
  const [msg, setMsg] = useState("");
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleClickToProducts = () => {
    navigate("/shop/products/");
  };

  const handleClickToCategory = (_categorie) => {
    navigate(`/shop/products/category/${_categorie}`);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleDeleteProducts = async () => {
    const confirmd = await alertDeleting(() => {
      deleteProducts();
    });

    if (confirmd) {
      setMsg("המוצרים נמחקו בהצלחה");
    } else return;
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
    <div className="container book-frame">
      <div>{msg}</div>
      {user?.isAdmin && (
        <Btn
          type={"submit"}
          className="custom-bg-purple custom-gold-color ms-auto"
          description={"מחקי את כלל המוצרים"}
          fn={() => {
            handleDeleteProducts();
          }}
        />
      )}
      <h1 className="fw-bold text-center custom-purple-color">
        ברוכים הבאים לחנות הקסמים שלי
      </h1>

      <div className="container-products w-75 m-auto">
        <div onClick={() => handleClickToProducts()} className="item-product">
          הצג הכל
        </div>
        {categories.map((categorie) => (
          <div
            key={categorie}
            className="item-product"
            onClick={() => handleClickToCategory(categorie)}
          >
            {categorie}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
