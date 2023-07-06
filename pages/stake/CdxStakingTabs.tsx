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
    <Box className="flex-col grey-card">
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <Tabs
        value={index}
        onChange={(_, newValue) => {
          setIndex(newValue);
        }}
        aria-label="basic tabs example"
        sx={{
          boxShadow: "-1px 1px 2px #181818, 1px -1px 2px #1e1e1e",
        }}
      >
        <Tab
          label="Stake"
          id="cdxlit-0"
          value={0}
          sx={{
            color: "white !important",
          }}
        />
        <Tab
          label="UNSTAKE"
          id="cdxlit-1"
          value={1}
          sx={{
            color: "white !important",
          }}
        />
        <Tab
          label="INFO"
          id="cdxlit-2"
          value={2}
          sx={{
            color: "white !important",
          }}
        />
      </Tabs>
      <Box className="p-4 pt-6">
        {index === 0 && (
          <Box className="flex-col">
            <Box>Stake CDX to earn a portion of the platform’s revenue.</Box>
            <Box className="mt-4">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AmountInput
                    label="Amount of CDX to stake"
                    value={stakeAmount}
                    onChange={(newValue) => {
                      setStakeAmount(newValue);
                    }}
                    error={stakeAmountBigNumber.gt(wantBalance || 0)}
                  />
                </Grid>
                <Grid item xs={6} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className="w-full"
                        disabled={
                          stakeAmountBigNumber.eq(0) ||
                          stakeAmountBigNumber.gt(wantBalance || 0) ||
                          stakeAmountBigNumber.lte(wantAllowance || 0)
                        }
                        onClick={() => approveCdx()}
                      >
                        Approve
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className="w-full"
                        disabled={
                          stakeAmountBigNumber.eq(0) ||
                          stakeAmountBigNumber.gt(wantBalance || 0) ||
                          stakeAmountBigNumber.gt(wantAllowance || 0)
                        }
                        onClick={() => stake()}
                      >
                        Stake
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
            <Box>Unstake CDX.</Box>
            <Box className="mt-4">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AmountInput
                    label="Amount of cdxLIT to unstake"
                    value={unstakeAmount}
                    onChange={(newValue) => {
                      setUnstakeAmount(newValue);
                    }}
                    error={unstakeAmountBigNumber.gt(stakedBalance || 0)}
                  />
                </Grid>
                <Grid item xs={6} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className="w-full"
                        disabled={
                          unstakeAmountBigNumber.eq(0) ||
                          unstakeAmountBigNumber.gt(stakedBalance || 0)
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
            <Grid container spacing={2}>
              <Grid item xs={3}>
                CDX token address
              </Grid>
              <Grid item xs={9}>
                <Link
                  href={getEtherscanLink(contracts.cdx)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contracts.cdx}
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                CDX Staking contract contract
              </Grid>
              <Grid item xs={9}>
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
