"use client";

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
import BaseRewardPool from "../../abis/BaseRewardPool.json";
import { BigNumber, ethers } from "ethers";
import { IERC20, LITDepositor } from "@/abis";
import AmountInput from "@/components/inputs/AmountInput";
import WaitingModal from "@/components/waiting-modal/WaitingModal";
import CodexTabs from "@/components/01-atoms/tabs/Tabs";

export default function CdxLitTabs() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isActive, setIsActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [convertAmount, setConvertAmount] = useState("0");
  const [stakeAmount, setStakeAmount] = useState("0");
  const [unstakeAmount, setUnstakeAmount] = useState("0");
  const [convertAmountBigNumber, setConvertAmountBigNumber] = useState(
    BigNumber.from("0")
  );
  const [stakeAmountBigNumber, setStakeAmountBigNumber] = useState(
    BigNumber.from("0")
  );
  const [unstakeAmountBigNumber, setUnstakeAmountBigNumber] = useState(
    BigNumber.from("0")
  );

  const { data: wantBalance, refetch: reloadWantBalance } = useContractRead({
    address: contracts.BALANCER_20WETH_80LIT as Address,
    abi: IERC20,
    functionName: "balanceOf",
    args: [address],
  });
  const { data: cdxLITBalance, refetch: reloadCdxLITBalance } = useContractRead(
    {
      address: contracts.cdxLIT as Address,
      abi: IERC20,
      functionName: "balanceOf",
      args: [address],
    }
  );
  const { data: wantAllowance, refetch: reloadWantAllowance } = useContractRead(
    {
      address: contracts.BALANCER_20WETH_80LIT as Address,
      abi: IERC20,
      functionName: "allowance",
      args: [address, contracts.litDepositor],
    }
  );
  const { data: cdxLITAllowance, refetch: reloadCdxLITAllowance } =
    useContractRead({
      address: contracts.cdxLIT as Address,
      abi: IERC20,
      functionName: "allowance",
      args: [address, contracts.cdxLITRewardPool],
    });
  const { data: stakedBalance, refetch: reloadStakedBalance } = useContractRead(
    {
      address: contracts.cdxLITRewardPool as Address,
      abi: BaseRewardPool,
      functionName: "balanceOf",
      args: [address],
    }
  );

  useEffect(() => {
    let amount = BigNumber.from(0);
    try {
      amount = ethers.utils.parseEther(convertAmount);
    } catch {}
    setConvertAmountBigNumber(amount);
  }, [convertAmount]);

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

  const { writeAsync: approveWant, status: convertApproveStatus } =
    useContractWrite({
      address: contracts.BALANCER_20WETH_80LIT as Address,
      abi: IERC20,
      functionName: "approve",
      args: [contracts.litDepositor, convertAmountBigNumber],
      chainId: chain?.id,
    });

  useEffect(() => {
    if (convertApproveStatus == "success") {
      reloadWantAllowance();
      setIsActive(false);
    }
    if (convertApproveStatus == "loading") {
      setIsActive(true);
    }
  }, [convertApproveStatus, reloadWantAllowance]);

  const { writeAsync: convert, status: convertStatus } = useContractWrite({
    address: contracts.litDepositor as Address,
    abi: LITDepositor,
    functionName: "deposit",
    args: [convertAmountBigNumber, false, ethers.constants.AddressZero],
    chainId: chain?.id,
  });

  useEffect(() => {
    if (convertStatus == "success") {
      reloadWantBalance();
      reloadWantAllowance();
      reloadCdxLITBalance();
      setIsActive(false);
    }
    if (convertStatus == "loading") {
      setIsActive(true);
    }
  }, [
    convertStatus,
    reloadCdxLITBalance,
    reloadWantAllowance,
    reloadWantBalance,
  ]);

  const { writeAsync: approveCdxLIT, status: stakeApproveStatus } =
    useContractWrite({
      address: contracts.cdxLIT as Address,
      abi: IERC20,
      functionName: "approve",
      args: [contracts.cdxLITRewardPool, stakeAmountBigNumber],
      chainId: chain?.id,
    });

  useEffect(() => {
    if (stakeApproveStatus == "success") {
      reloadCdxLITAllowance();
      setIsActive(false);
    }
    if (stakeApproveStatus == "loading") {
      setIsActive(true);
    }
  }, [stakeApproveStatus, reloadCdxLITAllowance]);

  const { writeAsync: stake, status: stakeStatus } = useContractWrite({
    address: contracts.cdxLITRewardPool as Address,
    abi: BaseRewardPool,
    functionName: "stake",
    args: [stakeAmountBigNumber],
    chainId: chain?.id,
  });

  useEffect(() => {
    if (stakeStatus == "success") {
      reloadCdxLITBalance();
      reloadCdxLITAllowance();
      reloadStakedBalance();
      setIsActive(false);
    }
    if (stakeStatus == "loading") {
      setIsActive(true);
    }
  }, [
    stakeStatus,
    reloadCdxLITBalance,
    reloadCdxLITAllowance,
    reloadStakedBalance,
  ]);

  const { writeAsync: unstake, status: unstakeStatus } = useContractWrite({
    address: contracts.cdxLITRewardPool as Address,
    abi: BaseRewardPool,
    functionName: "withdraw",
    args: [unstakeAmountBigNumber, false],
    chainId: chain?.id,
  });

  useEffect(() => {
    if (unstakeStatus == "success") {
      reloadCdxLITBalance();
      reloadStakedBalance();
      setIsActive(false);
    }
    if (unstakeStatus == "loading") {
      setIsActive(true);
    }
  }, [unstakeStatus, reloadCdxLITBalance, reloadStakedBalance]);

  return (
    <Box className="flex-col border border-gray-300 bg-gray-100 rounded-md p-4">
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <Box className="flex items-center justify-between">
        <Box className="flex">
          <Box className="flex-col mr-4">
            <div className="text-gray-400 text-xs">Claimable(USD value)</div>
            <div className="text-sm">$1,199,958</div>
          </Box>
          <Box className="flex-col mr-4">
            <div className="text-gray-400 text-xs">My vAPR</div>
            <div className="text-sm">0%</div>
          </Box>
          <Box className="flex-col mr-4">
            <div className="text-gray-400 text-xs">Max vAPR</div>
            <div className="text-sm">16.23% | 17.53%</div>
          </Box>
          <Box className="flex-col mr-4">
            <div className="text-gray-400 text-xs">My cdxLIT staked</div>
            <div className="text-sm">
              {stakedBalance
                ? ethers.utils.formatEther(stakedBalance as any)
                : "-"}{" "}
              cdxLIT
            </div>
          </Box>
          <Box className="flex-col mr-4">
            <div className="text-gray-400 text-xs">TVL</div>
            <div className="text-sm">$159.1m</div>
          </Box>
        </Box>

        <CodexTabs
          index={index}
          setIndex={setIndex}
          items={["Convert/Stake", "Unstake", "Info"]}
        />
      </Box>

      <Box className="p-4 pt-6">
        {index === 0 && (
          <Box className="flex-col">
            <div className="p-4 rounded-md bg-purple-100">
              <div className="text-xs">
                Convert Balancer 20WETH/80LIT LP to cdxLIT, stake cdxLIT for
                additional rewards coming from Codex.
              </div>
              <div className="text-gray-400 text-xs">
                Important: Converting 20WETH/80LIT LP to cdxLIT is irreversible.
                You may stake and unstake cdxLIT tokens, but not convert them
                back to 20WETH/80LIT LP. Secondary markets however exist to
                allow the exchange of cdxLIT for 20WETH/80LIT LP at varying
                market rates.
              </div>
            </div>
            <Box className="mt-4">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box className="flex justify-between items-center">
                    <div className="text-gray-400 text-xs mb-1 ">
                      Amount of 20WETH/80LIT LP to convert
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
                <Grid item xs={6}>
                  <AmountInput
                    value={convertAmount}
                    onChange={(newValue) => {
                      setConvertAmount(newValue);
                    }}
                    max={ethers.utils.formatEther((wantBalance as any) || 0)}
                    error={convertAmountBigNumber.gt((wantBalance as any) || 0)}
                  />
                </Grid>
                <Grid item xs={6} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        className="w-full codex-button"
                        disabled={
                          convertAmountBigNumber.eq(0) ||
                          convertAmountBigNumber.gt(
                            (wantBalance as any) || 0
                          ) ||
                          convertAmountBigNumber.lte(
                            (wantAllowance as any) || 0
                          )
                        }
                        onClick={() => approveWant()}
                      >
                        Approve
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        className="w-full codex-button"
                        disabled={
                          convertAmountBigNumber.eq(0) ||
                          convertAmountBigNumber.gt(
                            (wantBalance as any) || 0
                          ) ||
                          convertAmountBigNumber.gt((wantAllowance as any) || 0)
                        }
                        onClick={() => convert()}
                      >
                        Convert
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Box className="mt-4">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box className="flex justify-between items-center">
                    <div className="text-gray-400 text-xs mb-1 ">
                      Amount of cdxLIT to stake
                    </div>
                    <div className="flex text-gray-400 text-xs mb-1 ">
                      Available:{" "}
                      {/* <span className="text-black text-xs ml-1">
                        {ethers.utils.formatEther((cdxLITBalance as any) || 0)}
                      </span> */}
                    </div>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AmountInput
                    value={stakeAmount}
                    onChange={(newValue) => {
                      setStakeAmount(newValue);
                    }}
                    max={ethers.utils.formatEther((cdxLITBalance as any) || 0)}
                    error={stakeAmountBigNumber.gt((cdxLITBalance as any) || 0)}
                  />
                </Grid>
                <Grid item xs={6} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        className="w-full codex-button"
                        disabled={
                          stakeAmountBigNumber.eq(0) ||
                          stakeAmountBigNumber.gt(
                            (cdxLITBalance as any) || 0
                          ) ||
                          stakeAmountBigNumber.lte(
                            (cdxLITAllowance as any) || 0
                          )
                        }
                        onClick={() => approveCdxLIT()}
                      >
                        Approve
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        className="w-full codex-button"
                        disabled={
                          stakeAmountBigNumber.eq(0) ||
                          stakeAmountBigNumber.gt(
                            (cdxLITBalance as any) || 0
                          ) ||
                          stakeAmountBigNumber.gt((cdxLITAllowance as any) || 0)
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
            <div className="text-xs">
              Unstake cdxLIT. Note that unstaked cdxLIT doesn’t earn anything:
              any and all rewards only accrue to staked cdxLIT.
            </div>
            <Box className="mt-4">
              <Box className="flex justify-between items-center">
                <div className="text-gray-400 text-xs mb-1 ">
                  Amount cdxLIT to unstake
                </div>
                <div className="flex text-gray-400 text-xs mb-1 ">
                  Available:{" "}
                  <span className="text-black text-xs ml-1">
                    {ethers.utils.formatEther((stakedBalance as any) || 0)}
                  </span>
                </div>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AmountInput
                    value={unstakeAmount}
                    onChange={(newValue) => {
                      setUnstakeAmount(newValue);
                    }}
                    max={ethers.utils.formatEther((stakedBalance as any) || 0)}
                    error={unstakeAmountBigNumber.gt(
                      (stakedBalance as any) || 0
                    )}
                  />
                </Grid>
                <Grid item xs={6} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Button
                        variant="contained"
                        className="w-full codex-button"
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
              <Grid item xs={3}>
                Balancer 20WETH/80LIT token address:
              </Grid>
              <Grid item xs={9}>
                <Link
                  href={getEtherscanLink(contracts.BALANCER_20WETH_80LIT)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contracts.BALANCER_20WETH_80LIT}
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={0} className="mb-4 text-xs">
              <Grid item xs={3}>
                cdxLIT token address:
              </Grid>
              <Grid item xs={9}>
                <Link
                  href={getEtherscanLink(contracts.cdxLIT)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contracts.cdxLIT}
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={0} className="mb-4 text-xs">
              <Grid item xs={3}>
                Deposit contract address:
              </Grid>
              <Grid item xs={9}>
                <Link
                  href={getEtherscanLink(contracts.litDepositor)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contracts.litDepositor}
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={0} className="mb-4 text-xs">
              <Grid item xs={3}>
                Staking contract address:
              </Grid>
              <Grid item xs={9}>
                <Link
                  href={getEtherscanLink(contracts.cdxLITRewardPool)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contracts.cdxLITRewardPool}
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}
