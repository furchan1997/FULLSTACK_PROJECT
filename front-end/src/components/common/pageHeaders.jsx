// רכיב לכותרת ראשית + משנית
function PageHeaders({ title, description }) {
  return (
    <div className="container my-3 align-center rtl">
      <h1 className="text-center rtl fw-bold custom-text-gold rtl">{title}</h1>{" "}
      <h5>{description}</h5> {/* תיאור נוסף, לא מרכזי */}
    </div>
  );
}

export default PageHeaders;
