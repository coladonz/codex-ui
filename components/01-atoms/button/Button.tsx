import { MouseEvent } from "react";

import { cx } from "@/utils/cx";

interface ButtonProps {
  text: string;
  icon?: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isDisabled?: boolean;
  onClick?: () => void;
}

const Button = ({
  text,
  icon,
  style,
  className,
  size = "md",
  isDisabled,
  onClick,
}: ButtonProps) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick && !isDisabled) {
      event.preventDefault();
      onClick();
    }
  };

  const sizeClassnameMapping = {
    xs: "py-1 px-2 text-xs",
    sm: "py-1 px-2 text-sm",
    md: "py-2 px-4 text-md",
    lg: "py-2 px-4 text-lg",
    xl: "py-3 px-5 text-xl",
  };

  return (
    <button
      onClick={onClick && handleClick}
      className={cx(
        className ?? "",
        sizeClassnameMapping[size],
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : "dark:hover:bg-midnight-200 dark:hover:border-gray-200 cursor-pointer",
        "inline-flex items-center justify-center border border-gray-400 rounded-md text-midnight-200 dark:text-white transition-all"
      )}
      style={style}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
