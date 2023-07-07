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
          label="CONVERT/STAKE"
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
            <Box>
              Convert Balancer 20WETH/80LIT LP to cdxLIT, stake cdxLIT for
              additional rewards coming from Codex.
            </Box>
            <Box className="mt-4">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AmountInput
                    label="Amount of Balancer 20WETH/80LIT to convert"
                    value={convertAmount}
                    onChange={(newValue) => {
                      setConvertAmount(newValue);
                    }}
                    error={convertAmountBigNumber.gt(wantBalance || 0)}
                  />
                </Grid>
                <Grid item xs={6} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className="w-full"
                        disabled={
                          convertAmountBigNumber.eq(0) ||
                          convertAmountBigNumber.gt(wantBalance || 0) ||
                          convertAmountBigNumber.lte(wantAllowance || 0)
                        }
                        onClick={() => approveWant()}
                      >
                        Approve
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className="w-full"
                        disabled={
                          convertAmountBigNumber.eq(0) ||
                          convertAmountBigNumber.gt(wantBalance || 0) ||
                          convertAmountBigNumber.gt(wantAllowance || 0)
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
                  <AmountInput
                    label="Amount of cdxLIT to stake"
                    value={stakeAmount}
                    onChange={(newValue) => {
                      setStakeAmount(newValue);
                    }}
                    error={stakeAmountBigNumber.gt(cdxLITBalance || 0)}
                  />
                </Grid>
                <Grid item xs={6} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className="w-full"
                        disabled={
                          stakeAmountBigNumber.eq(0) ||
                          stakeAmountBigNumber.gt(cdxLITBalance || 0) ||
                          stakeAmountBigNumber.lte(cdxLITAllowance || 0)
                        }
                        onClick={() => approveCdxLIT()}
                      >
                        Approve
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button
                        color="primary"
                        variant="outlined"
                        className="w-full"
                        disabled={
                          stakeAmountBigNumber.eq(0) ||
                          stakeAmountBigNumber.gt(cdxLITBalance || 0) ||
                          stakeAmountBigNumber.gt(cdxLITAllowance || 0)
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
            <Box>Unstake cdxLIT.</Box>
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
                    <Grid item xs={4}>
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
              <Grid item xs={4}>
                Balancer 20WETH/80LIT token address
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
            <Grid container spacing={2}>
              <Grid item xs={4}>
                cdxLIT token address
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
            <Grid container spacing={2}>
              <Grid item xs={4}>
                Deposit contract address
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
            <Grid container spacing={2}>
              <Grid item xs={4}>
                Staking contract address
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
