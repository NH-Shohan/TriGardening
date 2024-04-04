import Footer from "@/components/Footer";
import { Glegoo } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

const glegoo = Glegoo({ subsets: ["latin"], weight: ["400", "700"] });

export default function Layout({ children }) {
  const path = usePathname();
  return (
    <>
      {/* Zerin */}
      <main className={`bg-white ${glegoo.className}`}>
        <Navbar />
        {children}
        {path === "/allplants" ? null : <Footer />}
      </main>
    </>
  );
}
