import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { getEtherscanLink } from "@/utils";
import contracts, { GaugeInfo } from "@/config/contracts";
import {
  Address,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  useWaitForTransaction,
} from "wagmi";
import { BigNumber, ethers } from "ethers";
import { IERC20, BaseRewardPool, Booster } from "@/abis";
import AmountInput from "@/components/inputs/AmountInput";
import WaitingModal from "@/components/waiting-modal/WaitingModal";
import CodexTabs from "@/components/01-atoms/tabs/Tabs";
import { waitForTransaction } from "wagmi/actions";

export default function BunniLPTabItem({ gauge }: { gauge: GaugeInfo }) {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isActive, setIsActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [depositAmount, setDepositAmount] = useState("0");
  const [withdrawAmount, setWithdrawAmount] = useState("0");
  const [depositAmountBigNumber, setDepositAmountBigNumber] = useState(
    BigNumber.from("0")
  );
  const [withdrawAmountBigNumber, setWithdrawAmountBigNumber] = useState(
    BigNumber.from("0")
  );

  const { data: wantBalance, refetch: reloadWantBalance } = useContractRead({
    address: gauge?.bunniLp as Address,
    abi: IERC20,
    functionName: "balanceOf",
    args: [address],
  });
  const { data: depositedBalance, refetch: reloadDepositedBalance } =
    useContractRead({
      address: gauge?.oLITRewards as Address,
      abi: IERC20,
      functionName: "balanceOf",
      args: [address],
    });
  const { data: wantAllowance, refetch: reloadWantAllowance } = useContractRead(
    {
      address: gauge?.bunniLp as Address,
      abi: IERC20,
      functionName: "allowance",
      args: [address, contracts.booster],
    }
  );

  useEffect(() => {
    let amount = BigNumber.from(0);
    try {
      amount = ethers.utils.parseEther(depositAmount);
    } catch {}
    setDepositAmountBigNumber(amount);
  }, [depositAmount]);

  useEffect(() => {
    let amount = BigNumber.from(0);
    try {
      amount = ethers.utils.parseEther(withdrawAmount);
    } catch {}
    setWithdrawAmountBigNumber(amount);
  }, [withdrawAmount]);

  const { writeAsync: approveWantAsync, status: depositApproveStatus } =
    useContractWrite({
      address: gauge?.bunniLp as Address,
      abi: IERC20,
      functionName: "approve",
      args: [contracts.booster, depositAmountBigNumber],
      chainId: chain?.id,
    });

  const approveWant = async () => {
    setIsActive(true);
    try {
      const tx = await approveWantAsync();
      await waitForTransaction({
        hash: tx.hash,
        confirmations: 1,
      });

      reloadWantAllowance();
      setIsActive(false);
    } catch (e) {
      console.log(e);
      setIsActive(false);
    }
  };

  const { writeAsync: depositAsync, status: depositStatus } = useContractWrite({
    address: contracts.booster as Address,
    abi: Booster,
    functionName: "deposit",
    args: [gauge?.pid, depositAmountBigNumber, true],
    chainId: chain?.id,
  });

  const deposit = async () => {
    setIsActive(true);
    try {
      const tx = await depositAsync();
      await waitForTransaction({
        hash: tx.hash,
        confirmations: 1,
      });

      reloadWantBalance();
      reloadWantAllowance();
      reloadDepositedBalance();
      setIsActive(false);
    } catch (e) {
      console.log(e);
      setIsActive(false);
    }
  };

  const { writeAsync: withdrawAsync, status: withdrawStatus } = useContractWrite({
    address: gauge?.oLITRewards as Address,
    abi: BaseRewardPool,
    functionName: "withdrawAndUnwrap",
    args: [withdrawAmountBigNumber, false],
    chainId: chain?.id,
  });

  const withdraw = async () => {
    setIsActive(true);
    try {
      const tx = await withdrawAsync();
      await waitForTransaction({
        hash: tx.hash,
        confirmations: 1,
      });

      reloadDepositedBalance();
      setIsActive(false);
    } catch (e) {
      console.log(e);
      setIsActive(false);
    }
  };

  return (
    <Box className="flex-col p-4 border border-gray-300">
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <div className="mb-2">
        <h1 className="font-bold text-sm">Stake {gauge.name}</h1>
      </div>
      <CodexTabs
        index={index}
        setIndex={setIndex}
        items={["Deposit", "Withdraw", "info"]}
      />
      <Box className="mt-4">
        {index === 0 && (
          <Box className="flex-col">
            <div className="p-4 rounded-md bg-purple-100">
              <div className="text-xs">Earn more! on Codex vault</div>
              <div className="text-gray-400 text-xs">
                Deposit liquidity into the Codex pool (without staking in the
                Bunni gauge), and then stake your LP tokens here to earn CDX on
                top of Bunni’s native rewards.
              </div>
            </div>
            <Box className="mt-4">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className="flex justify-between items-center">
                    <div className="text-gray-400 text-xs mb-1 ">
                      Amount of LP to deposit
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
                    value={depositAmount}
                    onChange={(newValue) => {
                      setDepositAmount(newValue);
                    }}
                    max={ethers.utils.formatEther((wantBalance as any) || 0)}
                    error={depositAmountBigNumber.gt((wantBalance as any) || 0)}
                  />
                </Grid>
                <Grid item xs={12} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        className="w-full codex-button"
                        disabled={
                          depositAmountBigNumber.eq(0) ||
                          depositAmountBigNumber.gt(
                            (wantBalance as any) || 0
                          ) ||
                          depositAmountBigNumber.lte(
                            (wantAllowance as any) || 0
                          )
                        }
                        onClick={() => approveWant()}
                      >
                        Approve
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        className="w-full codex-button"
                        disabled={
                          depositAmountBigNumber.eq(0) ||
                          depositAmountBigNumber.gt(
                            (wantBalance as any) || 0
                          ) ||
                          depositAmountBigNumber.gt((wantAllowance as any) || 0)
                        }
                        onClick={() => deposit()}
                      >
                        Deposit
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
            <div className="text-xs">Withdraw liquidity from codex vault</div>
            <Box className="mt-4">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className="flex justify-between items-center">
                    <div className="text-gray-400 text-xs mb-1 ">
                      Amount of LP to withdraw
                    </div>
                    <div className="flex text-gray-400 text-xs mb-1 ">
                      Available:{" "}
                      <span className="text-black text-xs ml-1">
                        {ethers.utils.formatEther(
                          (depositedBalance as any) || 0
                        )}
                      </span>
                    </div>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AmountInput
                    value={withdrawAmount}
                    onChange={(newValue) => {
                      setWithdrawAmount(newValue);
                    }}
                    max={ethers.utils.formatEther(
                      (depositedBalance as any) || 0
                    )}
                    error={withdrawAmountBigNumber.gt(
                      (depositedBalance as any) || 0
                    )}
                  />
                </Grid>
                <Grid item xs={12} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        className="w-full codex-button"
                        disabled={
                          withdrawAmountBigNumber.eq(0) ||
                          withdrawAmountBigNumber.gt(
                            (depositedBalance as any) || 0
                          )
                        }
                        onClick={() => withdraw()}
                      >
                        Withdraw
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
                Bunni LP token address:
              </Grid>
              <Grid item xs={12}>
                <Link
                  href={getEtherscanLink(gauge?.bunniLp)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {gauge?.bunniLp}
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={0} className="mb-4 text-xs">
              <Grid item xs={12}>
                Bunni LP gauge address:
              </Grid>
              <Grid item xs={12}>
                <Link
                  href={getEtherscanLink(gauge?.gauge)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {gauge?.gauge}
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={0} className="mb-4 text-xs">
              <Grid item xs={12}>
                Deposit contract address:
              </Grid>
              <Grid item xs={12}>
                <Link
                  href={getEtherscanLink(contracts.booster)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contracts.booster}
                </Link>
              </Grid>
            </Grid>
            <Grid container spacing={0} className="mb-4 text-xs">
              <Grid item xs={12}>
                Codex PID: {gauge?.pid}
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}
