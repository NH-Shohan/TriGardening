"use client";

import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Envelope, Key } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const AdminPage = () => {
  return (
    <main className="grid place-content-center h-screen w-screen">
      <div className="space-y-8 border w-[380px] p-5 bg-neutral-50 rounded-3xl">
        <Image src={logo} alt="logo" />
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              Icon={Envelope}
              type="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              Icon={Key}
              type="password"
              id="password"
              placeholder="Password"
            />
          </div>
        </div>
        <Button className="w-full">Login</Button>
      </div>
    </main>
  );
};

export default AdminPage;
