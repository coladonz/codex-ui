import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAccount, useNetwork } from 'wagmi';

export default function AppUpdater(): null {
	const dispatch = useDispatch();
	const { chain } = useNetwork();
	const { address } = useAccount();
	const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | null>(null);

	useEffect(() => {
		const rpc = chain?.rpcUrls.default.http[0];
		if (rpc) {
			const rpcProvider = new ethers.providers.JsonRpcProvider(rpc);
			setProvider(rpcProvider);
		}
	}, [dispatch, chain])

	useEffect(() => {
		if (provider) {
		}
	}, [dispatch, provider])

	useEffect(() => {
		if (provider && address) {
		}
	}, [dispatch, address, provider])

	return null;
}