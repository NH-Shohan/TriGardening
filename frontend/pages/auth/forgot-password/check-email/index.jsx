import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function CheckEmail() {
  return (
    <div className="bg-light w-screen h-screen flex flex-col justify-center items-center pb-[7%]">
      <Image
        src="./../../../message.svg"
        alt="key icon"
        width={90}
        height={90}
      />

      <h4 className="mt-5">Check your email</h4>
      <p className="body-small-bold mt-2 text-gray">
        No worries. We'll send you reset instructions.
      </p>
      <p className="body-bold text-black">example@gmail.com</p>

      <Button
        text="Open email app"
        href="/auth/forgot-password/set-new-password"
        className="w-[406px] mt-10"
      />

      <div className="flex my-10 items-center gap-1">
        <p className="body-small-bold text-gray">Didn't receive the email?</p>
        <Link className="body-small-bold text-primary" href="#">
          Click to resend
        </Link>
      </div>

      <BackButton text={"Back to Login"} path={"/auth/sign-in"} />
    </div>
  );
}
