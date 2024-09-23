"use client";

import leafShing from "@/assets/leafShing.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const actualCurrentPassword = "123456";

    if (
      currentPassword === "" &&
      newPassword === "" &&
      confirmPassword === ""
    ) {
      toast.warning("All the inputs are empty!");
      return;
    }

    if (currentPassword !== actualCurrentPassword) {
      toast.error("Current password is incorrect.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Password does not match.");
      return;
    }

    console.log("New Password:", newPassword);
    toast.success("Password changed successfully!");
  };

  return (
    <div className="grid place-content-center h-full relative">
      <Image
        src={leafShing}
        alt="leafShing"
        className="absolute top-[30%] right-[10%]"
        priority
      />
      <Image
        src={leafShing}
        alt="leafShing"
        className="absolute top-[30%] left-[10%] scale-x-[-1]"
        priority
      />
      <div className="space-y-8 border w-[380px] p-5 bg-neutral-50/50 backdrop-blur relative rounded-3xl">
        <h4>Password Change</h4>
        <form onSubmit={handleSubmit} className="space-y-4 w-full mt-5">
          <div className="relative">
            <Label>Current Password</Label>
            <Input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-9"
            >
              {showCurrentPassword ? (
                <EyeSlash className="text-neutral-600" size={20} />
              ) : (
                <Eye className="text-neutral-600" size={20} />
              )}
            </button>
          </div>

          <div className="relative">
            <Label>New Password</Label>
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-9"
            >
              {showNewPassword ? (
                <EyeSlash className="text-neutral-600" size={20} />
              ) : (
                <Eye className="text-neutral-600" size={20} />
              )}
            </button>
          </div>

          <div className="relative">
            <Label>Confirm New Password</Label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9"
            >
              {showConfirmPassword ? (
                <EyeSlash className="text-neutral-600" size={20} />
              ) : (
                <Eye className="text-neutral-600" size={20} />
              )}
            </button>
          </div>

          <Button type="submit" className="w-full mt-5">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
