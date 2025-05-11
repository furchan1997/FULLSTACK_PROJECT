import { useEffect } from "react";
import { useProduct } from "../../context/products.context";
import { useNavigate } from "react-router-dom";

function Shop() {
  const { getCategories, categories } = useProduct();
  const navigate = useNavigate();

  const handleClickToProducts = () => {
    navigate("/shop/products/");
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container book-frame">
      <h1 className="fw-bold text-center custom-purple-color">
        ברוכים הבאים לחנות הקסמים שלי
      </h1>

      <div className="container-products w-75 m-auto">
        <div onClick={() => handleClickToProducts()} className="item-product">
          הצג הכל
        </div>
        {categories.map((categorie) => (
          <div key={categorie} className="item-product">
            {categorie}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
