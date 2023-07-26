import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, Link, div } from "@mui/material";
import { formatDateTimeString, getEtherscanLink } from "@/utils";
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
import { formatEther } from "viem";

export default function CdxLocksView() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isActive, setIsActive] = useState(false);

  const { data: lockData, refetch: reloadLocks } = useContractRead({
    address: contracts.cdxLocker as Address,
    abi: CdxLockerV2,
    functionName: "lockedBalances",
    args: [address],
  });

  const { writeAsync: unlock, status: unlockStatus } = useContractWrite({
    address: contracts.cdxLocker as Address,
    abi: CdxLockerV2,
    functionName: "withdrawExpiredLocksTo",
    args: [address],
    chainId: chain?.id,
  });

  useEffect(() => {
    if (unlockStatus == "success") {
      reloadLocks();
      setIsActive(false);
    }
    if (unlockStatus == "loading") {
      setIsActive(true);
    }
  }, [unlockStatus, reloadLocks]);

  const locks: {
    amount: bigint;
    boosted: bigint;
    unlockTime: number;
  }[] = useMemo(() => {
    if (lockData) {
      return lockData[3] as any;
    }
    return [];
  }, [lockData]);

  return (
    <Box className="flex-col p-4 border border-gray-300">
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <div className="mb-2">
        <h1 className="font-bold text-sm">Your current CDX locks</h1>
      </div>
      {locks.length == 0 ? (
        <div>
          <div className="text-gray-400 text-xs">
            You have no CDX locks, Lock CDX on this page to get started.
          </div>
          <Button
            variant="contained"
            className="w-full codex-button"
            onClick={() => {}}
          >
            Go to vote page
          </Button>
        </div>
      ) : (
        <Box className="flex flex-col mb-10">
          <Box className="text-[12px]">
            <Box sx={{ borderBottom: "1px solid #1c1c1c" }}>
              <Grid container spacing={2} className="items-center">
                <Grid item xs={1}>
                  <div className="p-4 flex justify-center">▴</div>
                </Grid>
                <Grid item xs={3}>
                  <div className="p-2">Locked</div>
                </Grid>
                <Grid item xs={4}>
                  <div className="p-2">Unlock At</div>
                </Grid>
              </Grid>
            </Box>
            <Box>
              {locks.map((lock, index) => {
                return (
                  <Grid
                    container
                    spacing={2}
                    key={lock.unlockTime}
                    className="items-center"
                  >
                    <Grid item xs={1}>
                      <div className="p-4 flex justify-center">{index + 1}</div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className="p-2">{formatEther(lock.amount)} CDX</div>
                    </Grid>
                    <Grid item xs={4}>
                      <div className="p-2">
                        {formatDateTimeString(
                          new Date(lock.unlockTime * 1000),
                          true
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <div className="p-2">
                        <Button
                          variant="contained"
                          className="w-full codex-button"
                          disabled={
                            new Date().getTime() < lock.unlockTime * 1000
                          }
                          onClick={() => unlock()}
                        >
                          Unlock
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}
      <div>
        <span className="text-gray-400 text-xs">Current vote weight: </span>
        <span>
          {formatEther(
            locks.reduce((acc, cur) => {
              return acc + Number(cur.boosted);
            }, 0) as any
          )}{" "}
          vlCDX
        </span>
      </div>
    </Box>
  );
}
