"use client";

import leafShing from "@/assets/leafShing.svg";
import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Envelope, Key } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AdminPage = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (data.email === "admin@admin.com" && data.password === "123456") {
      router.push("/admin/dashboard");
    }
  };

  return (
    <main className="grid place-content-center h-screen w-screen">
      <div className="space-y-8 border w-[380px] p-5 pt-0 bg-neutral-50 relative rounded-3xl">
        <Image
          src={leafShing}
          alt="leafShing"
          className="absolute -top-64 -right-12 -z-10"
          priority
        />
        <Image
          src={leafShing}
          alt="leafShing"
          className="absolute -top-[288px] -left-12 -z-10 scale-x-[-1]"
          priority
        />

        <Image src={logo} alt="logo" priority />
        
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              Icon={Envelope}
              type="email"
              id="email"
              placeholder="Email"
              value={data.email}
              onChange={handleInput}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              Icon={Key}
              type="password"
              id="password"
              placeholder="Password"
              value={data.password}
              onChange={handleInput}
            />
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Login
        </Button>
      </div>
    </main>
  );
};

export default AdminPage;
