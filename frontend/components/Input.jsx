import { cn } from "@/lib/utils";

function Input({ label, className, type, name, placeholder }) {
  return (
    <div>
      <label className="body-small">{label}</label>
      <input
        className={cn(
          `body-small block p-2 rounded-md w-full border border-gray-light bg-white outline-none`,
          className
        )}
        type={type ? type : "text"}
        name={name}
        placeholder={placeholder ? placeholder : ""}
      />
    </div>
  );
}

export default Input;
