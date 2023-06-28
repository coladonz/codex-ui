/* eslint-disable react/no-children-prop */
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
  ledgerWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Provider } from "react-redux";
import store from '../state';

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { ReactNode } from "react";

import {
  ALCHEMY_KEY,
  ETH_CHAINS,
  WALLET_CONNECT_PROJECT_ID,
} from "@/utils/config";
import Updaters from "@/state/updater";

interface Props {
  children: ReactNode;
}

const projectId = WALLET_CONNECT_PROJECT_ID;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  ETH_CHAINS,
  [alchemyProvider({ apiKey: ALCHEMY_KEY }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ projectId, chains }),
      // walletConnectWallet({ projectId, chains, version: '1' }),
    ],
  },
  {
    groupName: "Others",
    wallets: [
      // trustWallet({ projectId, chains }),
      // ledgerWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: "Codex" }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const Web3Provider = (props: Props) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={{
          lightMode: lightTheme({ overlayBlur: "small" }),
          darkMode: darkTheme({ overlayBlur: "small" }),
        }}
        appInfo={{
          appName: "codex",
          learnMoreUrl: "https://codex.com",
        }}
      >
        <Provider store={store}>
          <Updaters />
          {props.children}
        </Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
