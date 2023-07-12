import SocialItem from "./SocialItem";

import { FaTelegramPlane as IconTelegram } from "react-icons/fa";

import {
  BsTwitter as IconTwitter,
  BsDiscord as IconDiscord,
} from "react-icons/bs";

import {
  SiGitbook as IconGitbook,
  SiSubstack as IconSubstack,
} from "react-icons/si";

import socials from "@/config/socials.json";

const iconMapping: { [key: string]: JSX.Element } = {
  Discord: <IconDiscord />,
  Twitter: <IconTwitter />,
  Telegram: <IconTelegram />,
  Gitbook: <IconGitbook />,
  Substack: <IconSubstack size={14} />,
};

const SocialList = () => {
  return (
    <div className="flex justify-between">
      {socials.map((social, i) => {
        return (
          <SocialItem
            key={i}
            href={social.href}
            icon={iconMapping[social.label]}
          />
        );
      })}
    </div>
  );
};

export default SocialList;
