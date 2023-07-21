import {
	localhost,
	mainnet,
	goerli,
	// polygon,
	// sepolia,
	// polygonMumbai,
	// polygonZkEvm,
	// polygonZkEvmTestnet,
	// bsc,
	// bscTestnet,
	// arbitrum,
	// arbitrumGoerli,
} from 'wagmi/chains';

export const ETH_CHAINS = [
	{
		...localhost,
		id: 31337,
	},
	mainnet,
	goerli,
	// polygon,
	// sepolia,
	// polygonMumbai,
	// polygonZkEvm,
	// polygonZkEvmTestnet,
	// bsc,
	// bscTestnet,
	// arbitrum,
	// arbitrumGoerli,
];
export const WALLET_CONNECT_PROJECT_ID =
	process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';
export const ALCHEMY_KEY =
	process.env.NEXT_PUBLIC_ALCHEMY_KEY || '';
