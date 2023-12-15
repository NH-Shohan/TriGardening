import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="bg-light w-screen h-screen flex flex-col justify-center items-center pb-[7%]">
      <Image src="./../../../key.svg" alt="key icon" width={90} height={90} />

      <h4 className="mt-5">Forgot password?</h4>
      <p className="body-small-bold mt-2 text-gray">
        No worries. We'll send you reset instructions.
      </p>

      <Input
        label="Email"
        type="email"
        placeholder="Enter an email"
        className={"w-[406px] my-10"}
      />

      <Button
        text="Reset Password"
        className="w-[406px]"
        href="/auth/forgot-password/check-email"
      />

      <Link href="/auth/sign-in" className="body-small-bold flex gap-2 mt-10">
        <Image
          src="./../../../back-arrow.svg"
          alt="key icon"
          width={16}
          height={16}
        />
        Back to Login
      </Link>
    </div>
  );
}
