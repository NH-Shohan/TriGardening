import Image from "next/image";
import Link from "next/link";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function SignIn() {
  return (
    <main className="h-screen w-screen background">
      <div className="h-screen w-screen bg-auth">
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="bg-[#0077004D] w-[486px] rounded-2xl p-10 shadow-inside backdrop-blur-[25px]">
            <h4 className="text-primary text-center mb-8">Sign in</h4>

            <Input
              label="Email/Phone Number"
              type="email"
              name="text"
              placeholder="Enter Email / Phone Number"
            />
            <Input
              label="Password"
              type="password"
              name="text"
              placeholder="Enter Password"
              className="mt-1"
            />

            <div className="flex justify-between mt-2 body-small">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="relative peer appearance-none w-4 h-4 
                border-2 border-primary rounded bg-light shrink-0 checked:bg-primary"
                />
                <label htmlFor="checkbox">Remember me</label>
                <svg
                  className={`absolute w-4 h-3 hidden peer-checked:block`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <Link
                className="text-primary body-small-bold"
                href="/auth/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>

            <Button text="Sign in" className="mt-7" />

            <div className="flex gap-1 mt-2">
              <p className="body-small">Don't have an account?</p>
              <Link
                href="/auth/sign-up"
                className="body-small-bold text-primary"
              >
                Sign up
              </Link>
            </div>

            <div className="flex justify-center items-center gap-2 opacity-30 my-8">
              <hr className="w-1/2 border-primary border" />
              <small>or</small>
              <hr className="w-1/2 border-primary border" />
            </div>

            <div className="flex justify-between gap-4">
              <button
                className="flex bg-white p-3 text-[12px] w-full gap-2 rounded-md items-center justify-center"
                type="button"
              >
                <Image
                  src="./../../../google.svg"
                  alt="google image icon"
                  width={24}
                  height={24}
                />
                Sign in with Google
              </button>
              <button
                className="flex bg-white p-3 text-[12px] w-full gap-2 rounded-md items-center justify-center"
                type="button"
              >
                <Image
                  src="./../../../facebook.svg"
                  alt="google image icon"
                  width={24}
                  height={24}
                />
                Sign in with Facebook
              </button>
            </div>
          </div>
          <div className="w-[486px]"></div>
        </div>
      </div>
    </main>
  );
}
