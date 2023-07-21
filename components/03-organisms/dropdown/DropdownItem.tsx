import Anchor from "@/components/01-atoms/anchor/Anchor";

import { BsFillRecordCircleFill } from "react-icons/bs";

interface DropdownItemProps {
  label: string;
  href: string;
}

const DropdownItem = ({ label, href }: DropdownItemProps) => {
  const Icon = <BsFillRecordCircleFill size={12} />;
  return (
    <li className="pl-[0.66rem] py-1 rounded-md dark:hover:text-white transition-colors">
      <Anchor label={label} href={href} icon={Icon} isExt />
    </li>
  );
};

export default DropdownItem;
