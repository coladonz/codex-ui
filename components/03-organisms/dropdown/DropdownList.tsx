"use client";

import { useState } from "react";

import DropdownItem from "./DropdownItem";

import { BsChevronDown } from "react-icons/bs";

import { cx } from "@/utils/cx";

interface DropdownListProps {
  label: string;
  icon?: JSX.Element;
  items: { label: string; href: string }[];
}

const DropdownList = ({ label, icon, items }: DropdownListProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const Toggle = () => {
    return (
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-between mx-2 cursor-pointer"
      >
        <span className="flex items-center">
          <span className="mr-3">{icon}</span>
          <span>{label}</span>
        </span>

        <span
          className={cx("transition-transform", isOpen ? "rotate-180" : "")}
        >
          <BsChevronDown />
        </span>
      </div>
    );
  };

  const Content = () => {
    return (
      <ul className="mt-2 space-y-1 text-sm">
        {items.map((item, i) => (
          <DropdownItem key={i} label={item.label} href={item.href} />
        ))}
      </ul>
    );
  };

  return (
    <>
      <Toggle />
      {isOpen && <Content />}
    </>
  );
};

export default DropdownList;
