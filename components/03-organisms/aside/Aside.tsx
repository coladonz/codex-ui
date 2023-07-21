import Logo from "@/components/01-atoms/logo/Logo";
import Switch from "@/components/01-atoms/switch/Switch";
import { default as Nav } from "@/components/03-organisms/nav/NavList";
import { default as Socials } from "@/components/03-organisms/socials/SocialList";
import { default as Dropdown } from "@/components/03-organisms/dropdown/DropdownList";

import { BiGlobe } from "react-icons/bi";
import { RiFolderInfoLine } from "react-icons/ri";

import community from "@/config/comm.json";
import docs from "@/config/docs.json";

const gradient = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="260"
      height="416"
      viewBox="0 0 260 416"
      fill="none"
    >
      <g opacity="0.32" filter="url(#filter0_f_1638_4470)">
        <circle cx="75" cy="74" r="122" fill="url(#paint0_linear_1638_4470)" />
      </g>
      <defs>
        <filter
          id="filter0_f_1638_4470"
          x="-267"
          y="-268"
          width="684"
          height="684"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="110"
            result="effect1_foregroundBlur_1638_4470"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1638_4470"
          x1="-2.5"
          y1="-6.5"
          x2="192"
          y2="248.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#E881FF" />
          <stop offset="1" stop-color="#E881FF" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
const Aside = () => {
  return (
    <aside
      aria-label="Sidebar"
      className="font-light flex flex-col justify-between fixed top-0 left-0 z-40 w-64 px-3 py-4 overflow-y-auto h-screen bg-daytime-200 dark:bg-inherit text-midnight-200 dark:text-gray-500 transition-transform -translate-x-full sm:translate-x-0 select-none border-r border-gray-200 dark:border-gray-400 dark:border-opacity-25"
      style={{
        background: "#0A0A0C",
        color: "#9EA1A8",
      }}
    >
      <div>
        <div className="flex items-center p-2">
          <Logo src="/logos/codex.png" />
          <h1
            className="text-xl ml-2"
            style={{ fontWeight: "bold", color: "#2f1449" }}
          >
            Codex
          </h1>
        </div>

        <div>
          {gradient()}
        </div>

        <div className="mt-8">
          <Nav />
        </div>

        <div className="mt-1 py-1">
          <Dropdown label="Community" icon={<BiGlobe />} items={community} />
        </div>

        <div className="mt-1 py-1">
          <Dropdown
            label="Documentation"
            icon={<RiFolderInfoLine />}
            items={docs}
          />
        </div>
      </div>

      <div>
        <div className="p-2 border-b border-gray-200 dark:border-gray-400 dark:border-opacity-25">
          <Socials />
        </div>
        <div className="flex justify-between p-2 pt-4 pr-4 text-sm">
          <span>
            <span className="font-bold">ROOT&nbsp;</span>
            <span className="text-xs font-thin">
              {"//"} {new Date().getFullYear()}
            </span>
          </span>
          <span>
            <Switch />
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
