import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoPic from "../public/logo 1.svg";
import Button from "./Button";

const Navbar = () => {
  const path = usePathname();

  const NavLink = ({ href, children }) => (
    <li>
      <Link href={href}>
        <p className={path === href ? "text-primary font-normal" : ""}>
          {children}
        </p>
      </Link>
    </li>
  );

  return (
    <>
      {!path.startsWith("/auth") && (
        <div className="h-[70px] flex justify-center items-center sticky top-0 z-50 bg-white/90 backdrop-blur-[5px]">
          <nav className="flex justify-between items-center container mx-auto">
            <Link href={"/"}>
              <div className="w-[50px] m-2 flex gap-1">
                <Image src={logoPic} alt="Logo Picture" />
                <h5 className="font-bold text-primary leading-5">
                  Tri
                  <br />
                  Gardening
                </h5>
              </div>
            </Link>

            <div>
              <ul className="body-small flex md:flex-row flex-col md:items-center gap-6">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/allplants">All Plants</NavLink>
                <NavLink href="/aboutus">About Us</NavLink>
                <NavLink href="/blogs">Blogs</NavLink>
                <NavLink href="/buy">Buy</NavLink>
                <NavLink href="/contactus">Contact Us</NavLink>
              </ul>
            </div>

            <Button className={""} href="/auth/sign-in">
              Login
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
