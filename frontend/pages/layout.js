import { Glegoo } from "next/font/google";

const glegoo = Glegoo({ subsets: ["latin"], weight: ["400", "700"] });

export default function Layout({ children }) {
  return (
    <>
      <main className={`${glegoo.className}`}>{children}</main>
    </>
  );
}
