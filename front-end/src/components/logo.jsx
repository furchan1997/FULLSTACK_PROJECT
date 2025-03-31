// רכיב לוגו שיוצג ברכיבים

function Logo({ color, colorClass }) {
  return (
    <span style={{ color }} className={colorClass}>
      🔮
    </span>
  );
}

export default Logo;
