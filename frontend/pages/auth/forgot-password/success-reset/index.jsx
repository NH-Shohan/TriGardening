import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Image from "next/image";

export default function SuccessReset() {
  return (
    <div className="bg-light w-screen h-screen flex flex-col justify-center items-center pb-[7%]">
      <Image
        src="./../../../success.svg"
        alt="key icon"
        width={90}
        height={90}
      />

      <h4 className="mt-5">Password reset</h4>
      <p className="body-small-bold mt-2 text-primary text-center">
        Your password has been successfully reset. <br /> Click below to login
        magically.
      </p>

      <Button href="/auth/sign-in" className="w-[406px] my-10">
        Continue
      </Button>

      <BackButton path={"/auth/sign-in"}>Back to Login</BackButton>
    </div>
  );
}
