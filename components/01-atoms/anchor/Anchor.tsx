import Link from "next/link";

import { cx } from "@/utils/cx";

interface AnchorProps {
  label: string;
  href: string;
  class?: string;
  icon?: JSX.Element;
  isExt?: boolean;
  isBlank?: boolean;
  hasNofollow?: boolean;
  hasNoreferrer?: boolean;
  classNames?: string;
}

const Anchor = ({
  label,
  href,
  icon,
  isExt,
  isBlank = true,
  hasNofollow = true,
  hasNoreferrer = true,
  classNames,
}: AnchorProps) => {
  const targetAttr = isExt && isBlank ? "_blank" : undefined;
  const relAttr = isExt
    ? `${hasNofollow ? "nofollow" : ""} ${
        hasNoreferrer ? "noreferrer" : ""
      }`.trim()
    : undefined;

  const AnchorComponent = !isExt ? Link : "a";

  const Icon = <span className="mr-3">{icon}</span>;
  const Label = <span>{label}</span>;

  return (
    <AnchorComponent
      href={href}
      rel={relAttr}
      target={targetAttr}
      className={cx("flex items-center", classNames ?? "")}
    >
      {Icon}
      {Label}
    </AnchorComponent>
  );
};

export default Anchor;
