import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React, { useState} from "react";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(01)\d{9}$/;
  
   // const router = useRouter();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      

  
            if (!emailRegex.test(username) && !phoneRegex.test(username)) {
              setErrorMessage("Invalid email/phone");
              return;
            } else if (!password.trim()) {
              setErrorMessage("Password is required");
              return;
            }

            try {
              setLoading(true);

              // Use Axios to send a login request to your server
              let data = {};
              if (emailRegex.test(username)) {
                // It's an email
                data = {
                  email: username,
                  password: password,
                };
              } else if (phoneRegex.test(username)) {
                // It's a phone number
                data = {
                  phone: username,
                  password: password,
                };
              }
              const response = await axios.post("http://localhost:3333/user/login", data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              });

              if (response.data.message === "Success login") {
                console.log("Login successful", response.data);
                setErrorMessage("Login successful ");
              } else {
                console.log("Account not found", response.data);
                setErrorMessage("Account not found ");
              }
            } catch (error) {
              console.error("Login failed", error);
              setErrorMessage("Not Responsed from backend");
            } finally {
              setLoading(false);
            }
          };
    
    
    
    
  



  return (
    <main className="h-screen w-screen background">
     
      <div className="h-screen w-screen bg-auth">
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="bg-[#0077004D] w-[486px] rounded-2xl p-10 shadow-inside backdrop-blur-[25px]">
            <h4 className="text-primary text-center mb-8">Sign in</h4>
            {errorMessage && <p className="text-red-800 my-2">{errorMessage}</p>}

         
            <Input
              label="Email/Phone Number"
              name="username"
              type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
             
            />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
               onChange={(e) => setPassword(e.target.value)}
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
                  className={`absolute 
                  w-4 h-3
                  hidden peer-checked:block`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
            <Button text={loading ? "Signing in..." : "Sign in"} className="mt-7" disabled={loading} onClick={handleLogin} />
           
        
            <div className="flex gap-1 mt-2">
              <p className="body-small">Don't have an account?</p>
              <Link href="/auth/sign-up" className="body-small-bold text-primary">
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
export default SignIn;
