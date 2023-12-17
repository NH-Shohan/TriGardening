function Input({ label, className, type, name, placeholder }) {
  return (
    <div className={`${className}`}>
      <label className="body-small">{label}</label>
      <input
        className={`body-small block p-2 rounded-md w-full border border-gray outline-none focus:border-primary`}
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder ? placeholder : ""}
      />
    </div>
  );
}

export default Input;
