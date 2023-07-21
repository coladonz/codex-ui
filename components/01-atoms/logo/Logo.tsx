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
  color: { from: "root-purple-200", to: "root-purple-300" },
};

const Logo = ({
  name = defaultProps.name,
  src = defaultProps.src,
  color = defaultProps.color,
}: LogoProps) => {
  const bgColorClass =
    typeof color === "string"
      ? `bg-${color}`
      : // : `bg-gradient-to-b from-root-purple-200 to-root-purple-300`;
        `bg-gradient-to-b from-${color?.from} to-${color?.to}`;

  return (
    <div
      className={cx("p-0 inline-block rounded-md")}
    >
      {src && <Image src={src} width={30} height={30} style={{borderRadius: '40%'}} alt={`${name} Logo`} />}
    </div>
  );
};

export default Logo;
