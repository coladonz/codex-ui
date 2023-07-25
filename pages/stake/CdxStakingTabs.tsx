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
import { IERC20, CdxRewardPool } from "@/abis";
import AmountInput from "@/components/inputs/AmountInput";
import WaitingModal from "@/components/waiting-modal/WaitingModal";
import CodexTabs from "@/components/01-atoms/tabs/Tabs";

export default function CdxStakingTabs() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isActive, setIsActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [stakeAmount, setStakeAmount] = useState("0");
  const [unstakeAmount, setUnstakeAmount] = useState("0");
  const [stakeAmountBigNumber, setStakeAmountBigNumber] = useState(
    BigNumber.from("0")
  );
  const [unstakeAmountBigNumber, setUnstakeAmountBigNumber] = useState(
    BigNumber.from("0")
  );

  const { data: wantBalance, refetch: reloadWantBalance } = useContractRead({
    address: contracts.cdx as Address,
    abi: IERC20,
    functionName: "balanceOf",
    args: [address],
  });
  const { data: wantAllowance, refetch: reloadWantAllowance } = useContractRead(
    {
      address: contracts.cdx as Address,
      abi: IERC20,
      functionName: "allowance",
      args: [address, contracts.cdxRewardPool],
    }
  );
  const { data: stakedBalance, refetch: reloadStakedBalance } = useContractRead(
    {
      address: contracts.cdxRewardPool as Address,
      abi: CdxRewardPool,
      functionName: "balanceOf",
      args: [address],
    }
  );

  useEffect(() => {
    let amount = BigNumber.from(0);
    try {
      amount = ethers.utils.parseEther(stakeAmount);
    } catch {}
    setStakeAmountBigNumber(amount);
  }, [stakeAmount]);

  useEffect(() => {
    let amount = BigNumber.from(0);
    try {
      amount = ethers.utils.parseEther(unstakeAmount);
    } catch {}
    setUnstakeAmountBigNumber(amount);
  }, [unstakeAmount]);

  const { writeAsync: approveCdx, status: stakeApproveStatus } =
    useContractWrite({
      address: contracts.cdx as Address,
      abi: IERC20,
      functionName: "approve",
      args: [contracts.cdxRewardPool, stakeAmountBigNumber],
      chainId: chain?.id,
    });

  useEffect(() => {
    if (stakeApproveStatus == "success") {
      reloadWantAllowance();
      setIsActive(false);
    }
    if (stakeApproveStatus == "loading") {
      setIsActive(true);
    }
  }, [stakeApproveStatus, reloadWantAllowance]);

  const { writeAsync: stake, status: stakeStatus } = useContractWrite({
    address: contracts.cdxRewardPool as Address,
    abi: CdxRewardPool,
    functionName: "stake",
    args: [stakeAmountBigNumber],
    chainId: chain?.id,
  });

  useEffect(() => {
    if (stakeStatus == "success") {
      reloadWantBalance();
      reloadWantAllowance();
      reloadStakedBalance();
      setIsActive(false);
    }
    if (stakeStatus == "loading") {
      setIsActive(true);
    }
  }, [
    stakeStatus,
    reloadWantBalance,
    reloadWantAllowance,
    reloadStakedBalance,
  ]);

  const { writeAsync: unstake, status: unstakeStatus } = useContractWrite({
    address: contracts.cdxRewardPool as Address,
    abi: CdxRewardPool,
    functionName: "withdraw",
    args: [unstakeAmountBigNumber, false],
    chainId: chain?.id,
  });

  useEffect(() => {
    if (unstakeStatus == "success") {
      reloadWantBalance();
      reloadStakedBalance();
      setIsActive(false);
    }
    if (unstakeStatus == "loading") {
      setIsActive(true);
    }
  }, [unstakeStatus, reloadWantBalance, reloadStakedBalance]);

  return (
    <Box className="flex-col p-4 border border-gray-300">
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <div className="mb-2">
        <h1 className="font-bold text-sm">Stake your CDX to earn oLIT</h1>
      </div>
      <CodexTabs
        index={index}
        setIndex={setIndex}
        items={["Stake", "Unstake", "info"]}
      />
      <Box className="mt-4">
        {index === 0 && (
          <Box className="flex-col">
            <div className="text-xs mb-1">
              Stake CDX on Codex to earn a portion of the platform’s revenue,
              distributed as oLIT tokens.
            </div>
            <div className="p-4 rounded-md bg-purple-100">
              <div className="text-gray-400 text-xs">
                Note: you can also lock CDX to earn a higher portion of the
                platform’s revenue and be able to vote on the platform’s
                periodic decisions. While staked CDX can be withdrawn at any
                time, locked CDX can only be withdrawn at the end of your lock
                period.
              </div>
            </div>
            <Box className="mt-4">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className="flex justify-between items-center">
                    <div className="text-gray-400 text-xs mb-1 ">
                      Amount of CDX to stake
                    </div>
                    <div className="flex text-gray-400 text-xs mb-1 ">
                      Available:{" "}
                      <span className="text-black text-xs ml-1">
                        {ethers.utils.formatEther((wantBalance as any) || 0)}
                      </span>
                    </div>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AmountInput
                    value={stakeAmount}
                    onChange={(newValue) => {
                      setStakeAmount(newValue);
                    }}
                    error={stakeAmountBigNumber.gt((wantBalance as any) || 0)}
                  />
                </Grid>
                <Grid item xs={12} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className="w-full"
                        disabled={
                          stakeAmountBigNumber.eq(0) ||
                          stakeAmountBigNumber.gt((wantBalance as any) || 0) ||
                          stakeAmountBigNumber.lte((wantAllowance as any) || 0)
                        }
                        onClick={() => approveCdx()}
                      >
                        Approve
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className="w-full"
                        disabled={
                          stakeAmountBigNumber.eq(0) ||
                          stakeAmountBigNumber.gt((wantBalance as any) || 0) ||
                          stakeAmountBigNumber.gt((wantAllowance as any) || 0)
                        }
                        onClick={() => stake()}
                      >
                        Stake CDX
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}

        {index === 1 && (
          <Box className="flex-col">
            <div className="text-xs">Unstake CDX from Codex.</div>
            <Box className="mt-4">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className="flex justify-between items-center">
                    <div className="text-gray-400 text-xs mb-1 ">
                      Amount of LP to usntake
                    </div>
                    <div className="flex text-gray-400 text-xs mb-1 ">
                      Available:{" "}
                      <span className="text-black text-xs ml-1">
                        {ethers.utils.formatEther((stakedBalance as any) || 0)}
                      </span>
                    </div>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AmountInput
                    value={unstakeAmount}
                    onChange={(newValue) => {
                      setUnstakeAmount(newValue);
                    }}
                    error={unstakeAmountBigNumber.gt(
                      (stakedBalance as any) || 0
                    )}
                  />
                </Grid>
                <Grid item xs={12} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className="w-full"
                        disabled={
                          unstakeAmountBigNumber.eq(0) ||
                          unstakeAmountBigNumber.gt((stakedBalance as any) || 0)
                        }
                        onClick={() => unstake()}
                      >
                        Unstake
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
        {index === 2 && (
          <Box className="flex-col">
            <Grid container spacing={0} className="mb-4 text-xs">
              <Grid item xs={12}>
                CDX token address
              </Grid>
              <Grid item xs={12}>
                <Link
                  href={getEtherscanLink(contracts.cdx)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contracts.cdx}
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={0} className="mb-4 text-xs">
              <Grid item xs={12}>
                CDX Staking contract contract
              </Grid>
              <Grid item xs={12}>
                <Link
                  href={getEtherscanLink(contracts.cdxRewardPool)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contracts.cdxRewardPool}
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}
