import {
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

export const NFT_CONTRACT_ADDRESS =
	'0x0Fc5f8A784810dEd101BD734cC59F6F7b868A3AF';
