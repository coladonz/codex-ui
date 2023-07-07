import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Inter } from "next/font/google";
import Header from "../Header";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: {
  children?:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-12 ${inter.className}`}
    >
      <Head>
        <title>Codex</title>
        <meta name="description" content="Codex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <Header />
        <div className="bottom-0 left-0 flex items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black static h-auto w-auto lg:bg-none my-24 lg:my-0">
          <ConnectButton />
        </div>
      </div>
      <div className="p-12 w-full h-full">{props.children}</div>
    </main>
  );
}
