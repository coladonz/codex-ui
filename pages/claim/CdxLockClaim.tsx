import { Button, TableCell, TableRow } from "@mui/material";
import contracts, { getToken, tokens } from "@/config/contracts";
import Image from "next/image";
import { CdxLockerV2 } from "@/abis";
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

export function CdxLockClaim() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isActive, setIsActive] = useState(false);
  const { data: claimable, refetch: reloadClaimable } = useContractRead({
    address: contracts.cdxLocker as Address,
    abi: CdxLockerV2,
    functionName: "claimableRewards",
    args: [address],
  });
  const { writeAsync: claim, status: claimStatus } = useContractWrite({
    address: contracts.cdxRewardPool as Address,
    abi: CdxLockerV2,
    functionName: "getReward",
    args: [address],
    chainId: chain?.id,
  });

  useEffect(() => {
    if (claimStatus == "success") {
      reloadClaimable();
      setIsActive(false);
    }
    if (claimStatus == "loading") {
      setIsActive(true);
    }
  }, [claimStatus, reloadClaimable]);

  return (
    <>
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <TableRow
        key="Locked CDX"
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
          Locked CDX
        </TableCell>
        <TableCell
          sx={{
            color: "rgb(156 163 175 / var(--tw-text-opacity))",
          }}
        >
          <div>
            <div>Amount Claimable</div>
            <div className="text-lg text-black font-bold">
              {claimable?.length
                ? claimable?.map((item: any) => {
                    return (
                      <>
                        {Number(
                          ethers.utils.formatUnits(
                            item.amount || 0,
                            getToken(item.token).decimals
                          )
                        ).toFixed(4)}{" "}
                        {getToken(item.token).symbol}
                      </>
                    );
                  })
                : "-"}
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
