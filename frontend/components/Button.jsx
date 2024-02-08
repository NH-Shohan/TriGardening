import Link from "next/link";

export default function Button({ text, className, href }) {
  return (
    <div className={`${className}`}>
      <Link href={href ? href : ""}>
        <button
          className={`gradient w-full body-bold text-center p-3 text-light rounded-md hover:transition-all body-small`}
          type="button"
        >
          {text}
        </button>
      </Link>
    </div>
  );
}
