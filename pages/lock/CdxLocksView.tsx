import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Link } from "@mui/material";
import { getEtherscanLink } from "@/utils";
import contracts from "@/config/contracts";
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { BigNumber, ethers } from "ethers";
import { IERC20, CdxLockerV2 } from "@/abis";
import AmountInput from "@/components/inputs/AmountInput";
import WaitingModal from "@/components/waiting-modal/WaitingModal";

export default function CdxLocksView() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isActive, setIsActive] = useState(false);

  const { data: locks, refetch: reloadLocks } = useContractRead({
    address: contracts.cdxLocker as Address,
    abi: CdxLockerV2,
    functionName: "lockedBalances",
    args: [address],
  });
  console.log("locks = ", locks);

  return (
    <Box className="flex-col">
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <Box className="flex flex-col mb-10 card-header bg-zinc-800/30">
        <Box className="p-4 w-full">Your current CDX locks</Box>
      </Box>
    </Box>
  );
}
