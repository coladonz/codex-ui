import Logo from "@/components/01-atoms/logo/Logo";
import Switch from "@/components/01-atoms/switch/Switch";
import { default as Nav } from "@/components/03-organisms/nav/NavList";
import { default as Socials } from "@/components/03-organisms/socials/SocialList";
import { default as Dropdown } from "@/components/03-organisms/dropdown/DropdownList";

import { BiGlobe } from "react-icons/bi";
import { RiFolderInfoLine } from "react-icons/ri";

import community from "@/config/comm.json";
import docs from "@/config/docs.json";

const Aside = () => {
  return (
    <aside
      aria-label="Sidebar"
      className="font-light flex flex-col justify-between fixed top-0 left-0 z-40 w-64 px-3 py-4 overflow-y-auto h-screen bg-daytime-200 dark:bg-inherit text-midnight-200 dark:text-gray-500 transition-transform -translate-x-full sm:translate-x-0 select-none border-r border-gray-200 dark:border-gray-400 dark:border-opacity-25"
    >
      <div>
        <div className="p-2">
          <Logo src="/logos/Root.svg" />
        </div>

        <div>
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
