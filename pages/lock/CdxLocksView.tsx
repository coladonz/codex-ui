import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
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
    <Box className="flex-col">
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <Box className="flex flex-col mb-10 card-header bg-zinc-800/30">
        <Box className="p-4 w-full">Your current CDX locks</Box>
        <Box className="grey-card">
          <Box sx={{ borderBottom: "1px solid #1c1c1c" }}>
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <Typography className="p-4 flex justify-center">▴</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className="p-4">Locked amount</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className="p-4">Boosted amount</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className="p-4">Unlock At</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            {locks.map((lock, index) => {
              return (
                <Grid container spacing={2} key={lock.unlockTime}>
                  <Grid item xs={1}>
                    <Typography className="p-4 flex justify-center">
                      {index + 1}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className="p-4">
                      {formatEther(lock.amount)} CDX
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className="p-4">
                      {formatEther(lock.boosted)} vlCDX
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography className="p-4">
                      {formatDateTimeString(
                        new Date(lock.unlockTime * 1000),
                        true
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className="p-4">
                      <Button
                        color="primary"
                        variant="outlined"
                        className="w-full"
                        disabled={new Date().getTime() < lock.unlockTime * 1000}
                        onClick={() => unlock()}
                      >
                        Unlock
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
