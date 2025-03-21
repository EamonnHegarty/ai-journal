import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  const href = userId ? "/journal" : "/new-user";

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
      <div className="mx-auto w-full max-w-[600px]">
        <h1 className="mb-4 text-6xl">AI Journal</h1>
        <p className="mb-4 text-2xl text-white/60">
          The best app for tracking your mood through life. All we ask is that
          you be honest.
        </p>
        <div>
          <Link href={href}>
            <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-xl">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
