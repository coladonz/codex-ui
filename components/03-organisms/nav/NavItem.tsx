"use client";

import Anchor from "@/components/01-atoms/anchor/Anchor";

import { usePathname } from "next/navigation";

import { IconType } from "react-icons";
import { GoHome } from "react-icons/go";
import { AiFillAppstore, AiFillUnlock, AiFillGift } from "react-icons/ai";
import { GiReceiveMoney, GiMoneyStack } from "react-icons/gi";
import { BsStack } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";
import { FaMoneyCheckAlt, FaFileExport } from "react-icons/fa";

import { cx } from "@/utils/cx";

interface NavItemProps {
  href: string;
  label: string;
  icon: string;
}

const iconMapping: { [key: string]: IconType } = {
  GoHome,
  AiFillAppstore,
  AiFillUnlock,
  AiFillGift,
  GiReceiveMoney,
  GiMoneyStack,
  TbPigMoney,
  BsStack,
  FaMoneyCheckAlt,
  FaFileExport,
};

const NavItem = ({ href, label, icon }: NavItemProps) => {
  const path = usePathname();

  const Icon = iconMapping[icon];

  return (
    <li>
      <Anchor
        href={href}
        label={label}
        icon={<Icon />}
        classNames={cx(
          "flex items-center px-2 py-1 rounded-md transition-colors",
          path === href
            ? "text-root-red-100 cursor-default"
            : "dark:hover:text-white"
        )}
      />
    </li>
  );
};

export default NavItem;
