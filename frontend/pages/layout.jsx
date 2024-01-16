import { Glegoo } from "next/font/google";
import Navbar from "../components/Navbar";

const glegoo = Glegoo({ subsets: ["latin"], weight: ["400", "700"] });

export default function Layout({ children }) {
  return (
    <>
      <main className={`${glegoo.className}`}>
        <Navbar/>
        {children}</main>
    </>
  );
}
