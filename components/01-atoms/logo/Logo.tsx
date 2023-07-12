import Image from "next/image";

import { cx } from "@/utils/cx";

import dAppData from "@/config/dApp.json";
const { name, logoSrc, logoColors } = dAppData;

interface LogoProps {
  src?: string;
  name?: string;
  color?: string | { from: string; to: string };
}

const defaultProps: LogoProps = {
  name: name,
  src: logoSrc,
  color: { from: "root-red-200", to: "root-red-300" },
};

const Logo = ({
  name = defaultProps.name,
  src = defaultProps.src,
  color = defaultProps.color,
}: LogoProps) => {
  const bgColorClass =
    typeof color === "string"
      ? `bg-${color}`
      : // : `bg-gradient-to-b from-root-red-200 to-root-red-300`;
        `bg-gradient-to-b from-${color?.from} to-${color?.to}`;

  return (
    <div
      className={cx("p-1 inline-block rounded-md", color ? bgColorClass : "")}
    >
      {src && <Image src={src} width={25} height={25} alt={`${name} Logo`} />}
    </div>
  );
};

export default Logo;
