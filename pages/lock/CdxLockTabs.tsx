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
import { IERC20, CdxLockerV2 } from "@/abis";
import AmountInput from "@/components/inputs/AmountInput";
import WaitingModal from "@/components/waiting-modal/WaitingModal";

export default function CdxLockTabs() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isActive, setIsActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [lockAmount, setLockAmount] = useState("0");
  const [lockAmountBigNumber, setLockAmountBigNumber] = useState(
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
      args: [address, contracts.cdxLocker],
    }
  );

  useEffect(() => {
    let amount = BigNumber.from(0);
    try {
      amount = ethers.utils.parseEther(lockAmount);
    } catch {}
    setLockAmountBigNumber(amount);
  }, [lockAmount]);

  const { writeAsync: approveCdx, status: lockApproveStatus } =
    useContractWrite({
      address: contracts.cdx as Address,
      abi: IERC20,
      functionName: "approve",
      args: [contracts.cdxLocker, lockAmountBigNumber],
      chainId: chain?.id,
    });

  useEffect(() => {
    if (lockApproveStatus == "success") {
      reloadWantAllowance();
      setIsActive(false);
    }
    if (lockApproveStatus == "loading") {
      setIsActive(true);
    }
  }, [lockApproveStatus, reloadWantAllowance]);

  const { writeAsync: lock, status: lockStatus } = useContractWrite({
    address: contracts.cdxLocker as Address,
    abi: CdxLockerV2,
    functionName: "lock",
    args: [address, lockAmountBigNumber, 0],
    chainId: chain?.id,
  });

  useEffect(() => {
    if (lockStatus == "success") {
      reloadWantBalance();
      reloadWantAllowance();
      setIsActive(false);
    }
    if (lockStatus == "loading") {
      setIsActive(true);
    }
  }, [lockStatus, reloadWantBalance, reloadWantAllowance]);

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
          label="Lock"
          id="cdxlit-0"
          value={0}
          sx={{
            color: "white !important",
          }}
        />
        <Tab
          label="Info"
          id="cdxlit-1"
          value={1}
          sx={{
            color: "white !important",
          }}
        />
      </Tabs>
      <Box className="p-4 pt-6">
        {index === 0 && (
          <Box className="flex-col">
            <Box>
              Lock CDX for 16 weeks. Locked CDX will earn platform fees as well
              as give voting weight for proposal and gauge weight voting.
            </Box>
            <Box className="mt-4">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AmountInput
                    label="Amount of CDX to lock"
                    value={lockAmount}
                    onChange={(newValue) => {
                      setLockAmount(newValue);
                    }}
                    error={lockAmountBigNumber.gt((wantBalance as any) || 0)}
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
                          lockAmountBigNumber.eq(0) ||
                          lockAmountBigNumber.gt((wantBalance as any) || 0) ||
                          lockAmountBigNumber.lte((wantAllowance as any) || 0)
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
                          lockAmountBigNumber.eq(0) ||
                          lockAmountBigNumber.gt((wantBalance as any) || 0) ||
                          lockAmountBigNumber.gt((wantAllowance as any) || 0)
                        }
                        onClick={() => lock()}
                      >
                        Lock
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
                CDX Locker contract contract
              </Grid>
              <Grid item xs={9}>
                <Link
                  href={getEtherscanLink(contracts.cdxLocker)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contracts.cdxLocker}
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
}
