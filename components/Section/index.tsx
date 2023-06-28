import { Inter } from "next/font/google";
import { ReactElement } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Section(props: {
  header: ReactElement;
  body: ReactElement;
}) {
  return (
    <div className="flex flex-col">
      <div className="p-4 card-header w-full bg-zinc-800/30">
        {props.header}
      </div>
      <div className="bg-gray-300 card-body">{props.body}</div>
    </div>
  );
}
