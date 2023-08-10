import { useEffect, useMemo, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { formatDateTimeString } from "@/utils";
import contracts from "@/config/contracts";
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { CdxLockerV2 } from "@/abis";
import WaitingModal from "@/components/waiting-modal/WaitingModal";
import { formatEther } from "viem";
import Input from "@/components/01-atoms/input/Input";
import { waitForTransaction } from "wagmi/actions";

export default function CdxLocksView() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isActive, setIsActive] = useState(false);
  const [delegateAddress, setDelegateAddress] = useState("");

  const { data: lockData, refetch: reloadLocks } = useContractRead({
    address: contracts.cdxLocker as Address,
    abi: CdxLockerV2,
    functionName: "lockedBalances",
    args: [address],
  });

  const { writeAsync: unlockAsync, status: unlockStatus } = useContractWrite({
    address: contracts.cdxLocker as Address,
    abi: CdxLockerV2,
    functionName: "withdrawExpiredLocksTo",
    args: [address],
    chainId: chain?.id,
  });

  const unlock = async () => {
    setIsActive(true);
    try {
      const tx = await unlockAsync();
      await waitForTransaction({
        hash: tx.hash,
        confirmations: 1,
      });

      reloadLocks();
      setIsActive(false);
    } catch (e) {
      console.log(e);
      setIsActive(false);
    }
  };

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

  const votingPower = locks.reduce((acc, cur) => {
    return acc + Number(cur.boosted);
  }, 0) as any;

  return (
    <>
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <Box className="flex-col p-4 border border-gray-300">
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
                        <div className="p-4 flex justify-center">
                          {index + 1}
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div className="p-2">
                          {formatEther(lock.amount)} CDX
                        </div>
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
          <span>{Number(votingPower) / 1e18} vlCDX</span>
        </div>
      </Box>

      <Box className="flex-col p-4 border border-gray-300">
        <div className="mb-2">
          <h1 className="font-bold text-sm">Delegate vote weight</h1>
          <Box className="mt-4">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box className="flex justify-between items-center">
                  <div className="text-gray-400 text-xs mb-1 ">
                    Delegate to a specific address
                  </div>
                  <div className="flex text-gray-400 text-xs mb-1 ">
                    Available:{" "}
                    <span className="text-black text-xs ml-1">
                      {Number(votingPower) / 1e18}
                    </span>
                  </div>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  className="w-full"
                  value={delegateAddress}
                  setter={setDelegateAddress}
                />
              </Grid>
              <Grid item xs={12} className="flex items-center justify-center">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      className="w-full codex-button"
                      onClick={() => {}}
                    >
                      Delegate
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box className="mt-4">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box className="flex justify-between items-center">
                  <div className="text-gray-400 text-xs mb-1 ">
                    Or delegate to the Convex team
                  </div>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} className="flex items-center justify-center">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="text"
                    className="w-full codex-button-secondary"
                    onClick={() => {}}
                  >
                    Delegate to Convex team
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
    </>
  );
}
