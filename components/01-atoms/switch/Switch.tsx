"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { PiCloudSunDuotone, PiCloudMoonDuotone } from "react-icons/pi";

import Button from "@/components/01-atoms/button/Button";

const Switch = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const Icon = ({ size }: { size: number }) => {
    return theme === "light" ? (
      <PiCloudMoonDuotone size={size} />
    ) : (
      <PiCloudSunDuotone size={size} />
    );
  };

  if (!mounted) return null;

  return (
    <div
      className="group inline-block cursor-pointer dark:hover:text-white "
      onClick={toggleTheme}
    >
      <div className="group-hover:scale-110 transition-all">
        <Icon size={16} />
      </div>
    </div>
  );
};

export default Switch;
