import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Button({
  children,
  className,
  href,
  outline,
  onClick,
}) {
  return (
    <div className={`${className}`}>
      {outline ? (
        <Link href={href ? href : ""}>
          <button
            onClick={onClick}
            className={cn(
              `font-normal text-center py-1.5 px-6 text-primary rounded-md body-small border border-primary hover:bg-primary hover:text-white transition`,
              className
            )}
            type="button"
          >
            {children}
          </button>
        </Link>
      ) : (
        <Link href={href ? href : ""}>
          <button
            onClick={onClick}
            className={`gradient w-full font-normal text-center py-1.5 px-6 text-light rounded-md body-small`}
            type="button"
          >
            {children}
          </button>
        </Link>
      )}
    </div>
  );
}
