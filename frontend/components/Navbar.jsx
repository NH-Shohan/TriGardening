import Image from "next/image";
import Link from "next/link";
import logoPic from "../public/logo 1.svg";

const Navbar = () => {
  return (
    <div>
      <header className="bg-white">
        <nav className="flex justify-between items-center w-[92%] mx-auto">
          <div className="w-[50px] m-2 flex">
          <Image  src={logoPic} alt="Logo Picture" />
          <h6 className=" font-bold text-primary ">Tri <br /> Gardening</h6>
          </div>
          <div className="md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[9%] md:w-auto w-full flex items-center px-5 ">
            <ul className=" flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              <li>
              <Link className=" text-primary hover:text-black" href="/">Home</Link>
              </li>
              <li>
              <Link  className=" text-primary hover:text-black" href="/allplants">All Plants</Link>
              </li>
              <li>
              <Link className=" text-primary hover:text-black" href="/aboutus">About Us</Link>
              </li>
              <li>
              <Link className=" text-primary hover:text-black" href="/blogs">Blogs</Link>
              </li>
              <li>
              <Link className=" text-primary hover:text-black" href="/buy">Buy</Link>
              </li>
              <li>
              <Link className=" text-primary hover:text-black" href="/contactus">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div>
          <Link className="bg-primary text-white px-5 py-2 rounded-xl hover:bg-secondary hover:text-black " href="/auth/sign-in">Login</Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
