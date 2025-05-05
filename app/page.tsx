import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  const href = userId ? "/journal" : "/new-user";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black p-4 text-white">
      <div className="mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          AI Journal
        </h1>
        <p className="mb-6 text-base text-white/70 sm:text-lg md:text-xl lg:text-2xl">
          The best app for tracking your mood through life. All we ask is that
          you be honest.
        </p>
        <div>
          <Link href={href}>
            <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-base transition-colors hover:bg-blue-700 sm:text-lg md:text-xl">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
