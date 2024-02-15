import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";

export default function ForgotPassword() {
  return (
    <div className="bg-light w-screen h-screen flex flex-col justify-center items-center pb-[7%]">
      <Image src="./../../../key.svg" alt="key icon" width={90} height={90} />

      <h4 className="mt-5">Forgot password?</h4>
      <p className="body-small-bold mt-2 text-gray">
        No worries. We'll send you reset instructions.
      </p>

      <Input
        label="Email / Phone Number"
        type="text"
        placeholder="Enter an email"
        className={"w-[406px] my-10"}
      />

      <Button className="w-[406px]" href="/auth/forgot-password/check-email">
        Reset Password
      </Button>

      <BackButton className={"mt-10"} path={"/auth/sign-in"}>
        Back to Login
      </BackButton>
    </div>
  );
}
