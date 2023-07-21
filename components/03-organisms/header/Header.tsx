import { ConnectButton } from "@rainbow-me/rainbowkit";

import Connect from "@/components/02-molecules/connect/Connect";

const stats = [
  {
    label: "Treasury TVL",
    number: 5411,
  },
  {
    label: "veROOT staked",
    number: 456741,
  },
  {
    label: "veROOT holders",
    number: 15464,
  },
  {
    label: "Total Fees Generated",
    number: 769841,
  },
  {
    label: "Total Fees Paid",
    number: 481515,
  },
  {
    label: "Total Root Bonded",
    number: 78451,
  },
];

interface StatProps {
  label: string;
  number: number;
}

const Stat = ({ label, number }: StatProps) => {
  return (
    <>
      <span className="text-sm">{label}</span>
      <span className="text-midnight-200 dark:text-white font-semibold">
        {number}
      </span>
    </>
  );
};

const Header = () => {
  return (
    <header className="text-gray-400 dark:text-gray-400 fixed w-full z-20 top-0 left-0 sm:pl-64 bg-inherit">
      <div className="flex flex-wrap items-center justify-between p-4 bg-daytime-200 dark:bg-inherit border-b border-gray-200 dark:border-gray-400 dark:border-opacity-25">
        <div className="max-w-screen-xl flex gap-x-4">
          {stats.map((stat, i) => {
            return (
              <div key={i} className="flex flex-col">
                <Stat label={stat.label} number={stat.number} />
              </div>
            );
          })}
        </div>
        <Connect />
      </div>
    </header>
  );
};

export default Header;
