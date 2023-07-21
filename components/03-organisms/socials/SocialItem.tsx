import { cx } from "@/utils/cx";

interface SocialItemProps {
  href: string;
  label?: string;
  icon?: JSX.Element;
  style?: React.CSSProperties;
}

type ReqSocialItemProps = Required<Pick<SocialItemProps, "href">> &
  ({ label: string; icon?: never } | { label?: never; icon: JSX.Element }) & {
    style?: React.CSSProperties;
  };

const SocialItem = ({ href, label, icon, style }: ReqSocialItemProps) => {
  return (
    <a
      href={href}
      style={style}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block p-2 hover:scale-110 dark:hover:text-white transition-all transform-gpu"
    >
      {icon || label}
    </a>
  );
};

export default SocialItem;
