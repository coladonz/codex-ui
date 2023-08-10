import { Button, TableCell, TableRow } from "@mui/material";
import contracts from "@/config/contracts";
import Image from "next/image";
import { CdxRewardPool } from "@/abis";
import { Address } from "viem";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import WaitingModal from "@/components/waiting-modal/WaitingModal";
import { waitForTransaction } from "wagmi/actions";

export function CdxStakingClaim() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isActive, setIsActive] = useState(false);
  const { data: claimable, refetch: reloadClaimable } = useContractRead({
    address: contracts.cdxRewardPool as Address,
    abi: CdxRewardPool,
    functionName: "earned",
    args: [address],
  });
  const { writeAsync: claimAsync, status: claimStatus } = useContractWrite({
    address: contracts.cdxRewardPool as Address,
    abi: CdxRewardPool,
    functionName: "getReward",
    args: [],
    chainId: chain?.id,
  });

  const claim = async () => {
    setIsActive(true);
    try {
      const tx = await claimAsync();
      await waitForTransaction({
        hash: tx.hash,
        confirmations: 1,
      });

      reloadClaimable();
      setIsActive(false);
    } catch (e) {
      console.log(e);
      setIsActive(false);
    }
  };

  return (
    <>
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <TableRow
        key="Staked CDX"
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell
          component="th"
          scope="row"
          sx={{
            color: "rgb(156 163 175 / var(--tw-text-opacity))",
          }}
        >
          Staked CDX
        </TableCell>
        <TableCell
          sx={{
            color: "rgb(156 163 175 / var(--tw-text-opacity))",
          }}
        >
          <div>
            <div>Amount Claimable</div>
            <div className="text-lg text-black font-bold">
              {Number(
                ethers.utils.formatEther((claimable as any) || 0)
              ).toFixed(4)}{" "}
              oLIT
            </div>
          </div>
        </TableCell>
        <TableCell
          sx={{
            color: "rgb(156 163 175 / var(--tw-text-opacity))",
          }}
        >
          <div>
            <div>Average vAPR</div>
            <div className="text-lg text-black font-bold">- %</div>
          </div>
        </TableCell>
        <TableCell align="right">
          <Button
            variant="text"
            className="codex-button"
            onClick={() => claim()}
          >
            <Image src="/icons/claim.svg" width={20} height={20} alt="claim" />
            Claim
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
