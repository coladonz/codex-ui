import NavItem from "./NavItem";

import navItems from "@/config/nav.json";

const NavList = () => {
  return (
    <nav>
      <ul className="space-y-2">
        {navItems.map((item) => {
          return (
            <NavItem
              label={item.label}
              href={item.href || ""}
              icon={item.icon || ""}
              key={item.label}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default NavList;
