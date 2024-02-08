import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoPic from "../public/logo 1.svg";
import Button from "./Button";

const Navbar = () => {
  const path = usePathname();

  return (
    <div className="h-[70px] shadow flex justify-center items-center">
      <nav className="flex justify-between items-center container mx-auto">
        <Link href={"/"}>
          <div className="w-[50px] m-2 flex gap-1">
            <Image src={logoPic} alt="Logo Picture" />
            <h5 className="font-bold text-primary leading-5">
              Tri <br /> Gardening
            </h5>
          </div>
        </Link>

        <div className="md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[9%] md:w-auto w-full flex items-center">
          <ul className="body-small flex md:flex-row flex-col md:items-center gap-10">
            <li>
              <Link
                className={
                  path === "/" ? "text-primary font-bold" : "text-black"
                }
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={
                  path === "/allplants"
                    ? "text-primary font-bold"
                    : "text-black"
                }
                href="/allplants"
              >
                All Plants
              </Link>
            </li>
            <li>
              <Link
                className={
                  path === "/aboutus" ? "text-primary font-bold" : "text-black"
                }
                href="/aboutus"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className={
                  path === "/blogs" ? "text-primary font-bold" : "text-black"
                }
                href="/blogs"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                className={
                  path === "/buy" ? "text-primary font-bold" : "text-black"
                }
                href="/buy"
              >
                Buy
              </Link>
            </li>
            <li>
              <Link
                className={
                  path === "/contactus"
                    ? "text-primary font-bold"
                    : "text-black"
                }
                href="/contactus"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <Button className={"w-[120px]"} href="/auth/sign-in" text={"Login"} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
