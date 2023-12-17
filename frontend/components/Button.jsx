import Link from "next/link";

function Button({ text, className, href, onClick }) {
  return (
    <div className={`${className}`}>
      <Link href={href ? href : ""}>
        <button
          className={`gradient w-full body-bold text-center p-3 text-light rounded-md hover:transition-all body-small`}
          type="button"
          onClick={onClick}
        >
          {text}
        </button>
      </Link>
    </div>
  );
}

export default Button;
