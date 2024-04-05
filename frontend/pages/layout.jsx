import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function Layout({ children }) {
  const path = usePathname();
  return (
    <>
      <main className={`bg-white ${inter.className}`}>
        <Navbar />
        {children}
        {path === "/allplants" ? null : <Footer />}
      </main>
    </>
  );
}
