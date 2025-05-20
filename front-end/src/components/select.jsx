function Select({ label, name, option = [], value, onChange, error, ...rest }) {
  console.log("typeof first option:", typeof option[0]);
  console.log("options:", option);

  return (
    <div className="mb-3 rtl">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}

      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="form-select"
        {...rest}
      >
        <option></option>
        {option.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <div className="text-danger mt-1">{error}</div>}
    </div>
  );
}

export default Select;
