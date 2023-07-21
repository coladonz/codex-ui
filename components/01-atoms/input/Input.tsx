"use client";

import { useState, useEffect } from "react";

import { BsSearch } from "react-icons/bs";

import { restrictInput } from "@/utils/input/restrictInput";
import { cx } from "@/utils/cx";

interface InputProps {
  value: string | undefined;
  label?: string;
  type?: "address" | "amount" | "percent" | "any";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  isMinimal?: boolean;
  isDisabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  icon?: JSX.Element | React.ReactNode;
  setter?: React.Dispatch<React.SetStateAction<string>>;
}

const inputSizeClassnameMapping = {
  xs: "py-0 px-0 text-sm",
  sm: "py-1 px-1 text-sm",
  md: "py-2 px-2 text-md",
  lg: "py-4 px-4 text-lg",
  xl: "py-6 px-6 text-xl",
};

const iconPositionClassnameMapping = {
  xs: "top-2.5 left-3",
  sm: "top-2.5 left-3",
  md: "top-2.5 left-3",
  lg: "top-2.5 left-3",
  xl: "top-5 left-3",
};

const variantClassNameMapping = {
  minimal: "border-b w-min px-0 text-center",
  boxed: "dark:bg-midnight-200 border border-gray-200 rounded-md",
};

const Input = ({
  value,
  label,
  type,
  size,
  style,
  className,
  placeholder,
  isMinimal,
  isDisabled,
  autoFocus,
  setter,
  icon = <BsSearch />,
}: InputProps) => {
  const [id, setId] = useState<string>("");
  useEffect(
    () => setId(`input-${Math.random().toString(36).substring(2, 10)}`),
    []
  );

  const onInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ClipboardEvent<HTMLInputElement>
  ) => {
    !isDisabled && setter && restrictInput(e, setter, type);
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    !isDisabled && setter && restrictInput(e, setter, type);
  };

  return (
    <div className="relative text-xs">
      {!isMinimal ||
        (!icon && (
          <div
            className={cx(
              size
                ? iconPositionClassnameMapping[size]
                : iconPositionClassnameMapping["md"],
              "flex items-center absolute"
            )}
          >
            {icon}
          </div>
        ))}

      <input
        id={id}
        type="text"
        inputMode="text"
        autoCorrect="off"
        spellCheck="false"
        autoComplete="off"
        pattern="[A-Za-z0-9]+"
        value={value}
        style={style}
        onChange={onInput}
        onPaste={onPaste}
        disabled={isDisabled}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className={cx(
          className ?? "",
          size
            ? inputSizeClassnameMapping[size]
            : inputSizeClassnameMapping["md"],
          isMinimal
            ? variantClassNameMapping["minimal"]
            : variantClassNameMapping["boxed"],
          isDisabled ? "text-gray-400" : "asd",
          "focus:outline-none"
        )}
      />
      {label && (
        <label htmlFor={id}>
          <small>{label}</small>
        </label>
      )}
    </div>
  );
};

export default Input;
