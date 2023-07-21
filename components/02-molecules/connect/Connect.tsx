"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { BsExclamationTriangleFill } from "react-icons/bs";
import { BiWallet } from "react-icons/bi";

import Image from "next/image";

import Button from "@/components/01-atoms/button/Button";
import { cx } from "@/utils/cx";

const Connect = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const connected = mounted && account && chain;

        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    icon={<BiWallet />}
                    text="Sign up"
                    onClick={openConnectModal}
                  />
                );
              }

              return (
                <div
                  className={cx(
                    "flex gap-x-6",
                    chain.unsupported ? "cursor-pointer" : ""
                  )}
                  onClick={chain.unsupported ? openChainModal : undefined}
                >
                  <div className="flex flex-col items-end">
                    <span className="text-sm">Connected Network</span>
                    <span className="flex items-center gap-x-2 text-midnight-200 dark:text-white font-semibold">
                      {chain.unsupported && (
                        <BsExclamationTriangleFill size={14} />
                      )}
                      {chain.unsupported
                        ? "Unsupported"
                        : `${chain.name} Network`}
                    </span>
                  </div>
                  <div
                    className="flex flex-col items-end cursor-pointer"
                    onClick={!chain.unsupported ? openAccountModal : undefined}
                  >
                    <span className="text-sm">Connected Wallet</span>
                    <span className="text-midnight-200 dark:text-white font-semibold">
                      {account.displayName}
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default Connect;
