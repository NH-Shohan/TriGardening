import Image from "next/image";
import Link from "next/link";
import logoPic from "../public/logo 1.svg";

const Navbar = () => {
  return (
    <div>
      <Image src={logoPic} alt="Logo Picture" />
      <Link href="/">Home</Link>
      <Link href="/allPlants">All Plants</Link>
      <Link href="/aboutUs">About Us</Link>
      <Link href="/blogs">Blogs</Link>
      <Link href="/buy">Buy</Link>
      <Link href="/contactUs">Contact Us</Link>
      <Link href="/auth/sign-in">Login</Link>
    </div>
  );
};

export default Navbar;
