import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Link } from "@mui/material";
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

export default function BunniLPTabItem({ gauge }: { gauge: GaugeInfo }) {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isActive, setIsActive] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
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
    address: gauge.bunniLp as Address,
    abi: IERC20,
    functionName: "balanceOf",
    args: [address],
  });
  const { data: depositedBalance, refetch: reloadDepositedBalance } =
    useContractRead({
      address: gauge.oLITRewards as Address,
      abi: IERC20,
      functionName: "balanceOf",
      args: [address],
    });
  const { data: wantAllowance, refetch: reloadWantAllowance } = useContractRead(
    {
      address: gauge.bunniLp as Address,
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

  const { writeAsync: approveWant, status: depositApproveStatus } =
    useContractWrite({
      address: gauge.bunniLp as Address,
      abi: IERC20,
      functionName: "approve",
      args: [contracts.booster, depositAmountBigNumber],
      chainId: chain?.id,
    });

  useEffect(() => {
    if (depositApproveStatus == "success") {
      reloadWantAllowance();
      setIsActive(false);
    } else if (depositApproveStatus == "loading") {
      setIsActive(true);
    }
  }, [depositApproveStatus, reloadWantAllowance]);

  const { writeAsync: deposit, status: depositStatus } = useContractWrite({
    address: contracts.booster as Address,
    abi: Booster,
    functionName: "deposit",
    args: [gauge.pid, depositAmountBigNumber, true],
    chainId: chain?.id,
  });

  useEffect(() => {
    if (depositStatus == "success") {
      reloadWantBalance();
      reloadWantAllowance();
      reloadDepositedBalance();
      setIsActive(false);
    }
    if (depositStatus == "loading") {
      setIsActive(true);
    }
  }, [
    depositStatus,
    reloadDepositedBalance,
    reloadWantAllowance,
    reloadWantBalance,
  ]);

  const { writeAsync: withdraw, status: withdrawStatus } = useContractWrite({
    address: gauge.oLITRewards as Address,
    abi: BaseRewardPool,
    functionName: "withdraw",
    args: [withdrawAmountBigNumber, false],
    chainId: chain?.id,
  });

  useEffect(() => {
    if (withdrawStatus == "success") {
      reloadDepositedBalance();
      setIsActive(false);
    }
    if (withdrawStatus == "loading") {
      setIsActive(true);
    }
  }, [withdrawStatus, reloadDepositedBalance]);

  return (
    <Box className="flex-col">
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <Box
        className="flex p-4 mb-1 grey-card cursor-pointer"
        sx={{
          fontSize: "14px",
          ":hover": {
            opacity: "0.85",
          },
        }}
        onClick={() => {
          setOpenDropdown(!openDropdown);
        }}
      >
        <h3>{gauge.name}</h3>
      </Box>
      {openDropdown && (
        <Box className="grey-card">
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
              label="DEPOSIT"
              id="cdxlit-0"
              value={0}
              sx={{
                color: "white !important",
              }}
            />
            <Tab
              label="WITHDRAW"
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
                  Deposit Bunni LP into Codex to earn CDX on top of Bunni native
                  rewards
                </Box>
                <Box className="mt-4">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <AmountInput
                        label="Bunni LP Amount"
                        value={depositAmount}
                        onChange={(newValue) => {
                          setDepositAmount(newValue);
                        }}
                        error={depositAmountBigNumber.gt(
                          (wantBalance as any) || 0
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      className="flex items-center justify-center"
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Button
                            color="primary"
                            variant="outlined"
                            className="w-full"
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
                        <Grid item xs={3}>
                          <Button
                            color="primary"
                            variant="outlined"
                            className="w-full"
                            disabled={
                              depositAmountBigNumber.eq(0) ||
                              depositAmountBigNumber.gt(
                                (wantBalance as any) || 0
                              ) ||
                              depositAmountBigNumber.gt(
                                (wantAllowance as any) || 0
                              )
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
                <Box>Withdraw Bunni LP from Codex</Box>
                <Box className="mt-4">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <AmountInput
                        label="Bunni LP amount"
                        value={withdrawAmount}
                        onChange={(newValue) => {
                          setWithdrawAmount(newValue);
                        }}
                        error={withdrawAmountBigNumber.gt(
                          (depositedBalance as any) || 0
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      className="flex items-center justify-center"
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Button
                            color="primary"
                            variant="outlined"
                            className="w-full"
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
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    Bunni LP token address
                  </Grid>
                  <Grid item xs={9}>
                    <Link
                      href={getEtherscanLink(gauge.bunniLp)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {gauge.bunniLp}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    Bunni LP gauge address
                  </Grid>
                  <Grid item xs={9}>
                    <Link
                      href={getEtherscanLink(gauge.gauge)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {gauge.gauge}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    Deposit contract address
                  </Grid>
                  <Grid item xs={9}>
                    <Link
                      href={getEtherscanLink(contracts.booster)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contracts.booster}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    Codex PID
                  </Grid>
                  <Grid item xs={9}>
                    {gauge.pid}
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
