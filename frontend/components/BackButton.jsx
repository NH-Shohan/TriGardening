import Image from "next/image";
import Link from "next/link";

export default function ({ className, text, path, children }) {
  return (
    <Link href={path} className={`body-small-bold flex gap-2 ${className}`}>
      <Image
        src="./../../../back-arrow.svg"
        alt="icon"
        width={16}
        height={16}
      />
      <button>{children}</button>
    </Link>
  );
}
