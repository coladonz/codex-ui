import { Inter } from "next/font/google";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import { cx } from "@/utils/cx";

import Header from "@/components/03-organisms/header/Header";
import Aside from "@/components/03-organisms/aside/Aside";
import Main from "@/components/03-organisms/main/Main";

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
    <div
      style={{ colorScheme: "light" }}
      className={cx(inter.className, "light")}
    >
      <div>
        <Header />
        <Aside />
        <Main>{props.children}</Main>
      </div>
    </div>
  );
}
