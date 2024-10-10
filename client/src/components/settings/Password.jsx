"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import { toast } from "sonner";

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.warning("All fields are required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}auth/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmNewPassword: confirmPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to change password");
      }

      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="space-y-8 bg-neutral-50/50">
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="flex w-full gap-4">
            <div className="relative w-full">
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

            <div className="relative w-full">
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
          </div>

          <Button type="submit" className="w-full mt-5">
            Change Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Password;
