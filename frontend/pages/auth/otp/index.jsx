import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Image from "next/image";

export default function OTP() {
  return (
    <div className="bg-light w-screen h-screen flex flex-col justify-center items-center pb-[7%]">
      <Image src="./../../../pin.svg" alt="key icon" width={90} height={90} />

      <h4 className="mt-5">Enter Code</h4>
      <p className="body-small-bold mt-2 text-gray text-center">
        No worries. We sent you SMS/Email with 6 digit <br />
        verification code (OTP) on
      </p>
      <p className="text-center body-bold mt-2">+8801987654321</p>

      <div className="flex justify-between w-[406px] mt-8">
        <input
          type="text"
          className="border border-primary outline-none rounded-md p-2 w-14 h-16 text-[30px] font-bold text-center"
        />
        <input
          type="text"
          className="border border-primary outline-none rounded-md p-2 w-14 h-16 text-[30px] font-bold text-center"
        />
        <input
          type="text"
          className="border border-primary outline-none rounded-md p-2 w-14 h-16 text-[30px] font-bold text-center"
        />
        <input
          type="text"
          className="border border-primary outline-none rounded-md p-2 w-14 h-16 text-[30px] font-bold text-center"
        />
        <input
          type="text"
          className="border border-primary outline-none rounded-md p-2 w-14 h-16 text-[30px] font-bold text-center"
        />
        <input
          type="text"
          className="border border-primary outline-none rounded-md p-2 w-14 h-16 text-[30px] font-bold text-center"
        />
      </div>

      <Button
        className="w-[406px] mt-5"
        href="/auth/forgot-password/success-reset"
      >
        Reset Password
      </Button>

      <div className="flex body-small mt-5 gap-2 text-gray">
        <p>Enter the code, you have in</p>
        <p className="body-small-bold text-primary">4:37 min</p>
      </div>

      <BackButton className={"mt-5"} path={"/auth/sign-in"}>
        Back to Login
      </BackButton>

      <div className="flex body-small-bold mt-20 gap-2 text-gray">
        <p>Didn't receive the email?</p>
        <button className="text-primary">Click to resend</button>
      </div>
    </div>
  );
}
