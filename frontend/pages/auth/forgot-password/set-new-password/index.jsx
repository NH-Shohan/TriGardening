import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";

export default function SetNewPassword() {
  return (
    <div className="bg-light w-screen h-screen flex flex-col justify-center items-center pb-[7%]">
      <Image src="./../../../key.svg" alt="key icon" width={90} height={90} />

      <h4 className="mt-5">Set new password</h4>
      <p className="body-small-bold mt-2 text-gray text-center">
        Your new password must be different to <br />
        previously used password.
      </p>

      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        className={"w-[406px] mt-5"}
      />
      <p className="text-[12px] text-left w-[406px] mt-1 font-bold text-red">
        Password must be at least 8 characters.
      </p>

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Re-enter password"
        className={"w-[406px] mt-5"}
      />
      <p className="text-[12px] text-left w-[406px] mt-1 font-bold text-red">
        Password must be at least 8 characters.
      </p>

      <Button
        text="Reset Password"
        className="w-[406px] mt-5"
        href="/auth/forgot-password/success-reset"
      />

      <BackButton
        className={"mt-10"}
        text={"Back to Login"}
        path={"/auth/sign-in"}
      />
    </div>
  );
}
