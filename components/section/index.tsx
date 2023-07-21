import { Box } from "@mui/material";
import { Inter } from "next/font/google";
import { ReactElement } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Section(props: {
  header: ReactElement;
  body: ReactElement;
}) {
  return (
    <Box className="flex flex-col mb-10">
      <Box className="p-4 card-header w-full bg-zinc-800/30">
        {props.header}
      </Box>
      <Box className="card-body">{props.body}</Box>
    </Box>
  );
}
