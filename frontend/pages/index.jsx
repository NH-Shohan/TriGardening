import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <Link href="/auth/sign-in">Sign In</Link>
    </main>
  );
}
