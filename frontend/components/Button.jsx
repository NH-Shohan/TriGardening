import Link from "next/link";

export default function Button({ children, className, href, outline }) {
  return (
    <div className={`${className}`}>
      {outline ? (
        <Link href={href ? href : ""}>
          <button
            className={`body-bold text-center py-3 text-primary rounded-lg hover:transition-all body-small border border-primary hover:bg-primary hover:text-white transition ${className}`}
            type="button"
          >
            {children}
          </button>
        </Link>
      ) : (
        <Link href={href ? href : ""}>
          <button
            className={`gradient w-full body-bold text-center py-3 text-light rounded-lg hover:transition-all body-small`}
            type="button"
          >
            {children}
          </button>
        </Link>
      )}
    </div>
  );
}
