import Image from "next/image";
import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://codex.io";

  const links = [
    {
      title: "Next.js",
      description:
        "Seamlessly integrate your decentralized application with Next.js, a popular React-based framework.",
      href: "https://nextjs.org",
    },
    {
      title: "RainbowKit",
      description: "A powerful and easy-to-use wallet Ethereum-based dApps.",
      href: "https://www.rainbowkit.com",
    },
    {
      title: "WAGMI",
      description:
        "wagmi is a collection of React Hooks containing everything you need to start working with Ethereum.",
      href: "https://wagmi.sh",
    },
    {
      title: "Examples",
      description:
        "Start by exploring some pre-built examples to inspire your creativity!",
      href: `${origin}/examples`,
    },
  ];
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Head>
        <title>Codex</title>
        <meta name="description" content="Codex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Codex
        </p>
        <div className="bottom-0 left-0 flex items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black static h-auto w-auto lg:bg-none my-24 lg:my-0">
          <ConnectButton />
        </div>
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left mt-24 lg:mt-0">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              {link.title}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
