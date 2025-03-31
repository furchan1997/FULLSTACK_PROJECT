// רכיב עבור כפתור שיהיה בו שימוש ברכיבים הרלוונטיים

function Btn({ type, className, description, fn = () => {}, ...rest }) {
  return (
    <>
      <button
        type={type}
        className={`btn ${className} mt-3`}
        onClick={fn}
        {...rest}
      >
        {description}
      </button>
    </>
  );
}

export default Btn;
