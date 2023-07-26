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
import CodexTabs from "@/components/01-atoms/tabs/Tabs";

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
    <Box className="flex-col border border-gray-300 bg-gray-100 p-4">
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <Box className="flex items-center justify-between">
        <Box className="flex">
          <Box className="flex-col mr-4">
            <div className="text-gray-400 text-xs">Claimable(USD value)</div>
            <div className="text-sm">$1,199,958</div>
          </Box>
          <Box className="flex-col mr-4">
            <div className="text-gray-400 text-xs">vAPR</div>
            <div className="text-sm">0%</div>
          </Box>
          <Box className="flex-col mr-4">
            <div className="text-gray-400 text-xs">My CDX Locked</div>
            <div className="text-sm">- CDX</div>
          </Box>
          <Box className="flex-col mr-4">
            <div className="text-gray-400 text-xs">Total Locked</div>
            <div className="text-sm">$159.1m</div>
          </Box>
        </Box>

        <CodexTabs
          index={index}
          setIndex={setIndex}
          items={["Lock", "Info"]}
        />
      </Box>
      <Box className="p-4 pt-6">
        {index === 0 && (
          <Box className="flex-col">
            <div className="p-4 rounded-md bg-purple-100">
              <div className="text-xs">
                Lock CDX for 16 weeks. Locked CDX will earn platform fees as
                well as give voting weight for proposal and gauge weight voting.
              </div>
            </div>
            <Box className="mt-4">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className="flex justify-between items-center">
                    <div className="text-gray-400 text-xs mb-1 ">
                      Amount of CDX to lock
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
                    value={lockAmount}
                    onChange={(newValue) => {
                      setLockAmount(newValue);
                    }}
                    error={lockAmountBigNumber.gt((wantBalance as any) || 0)}
                  />
                </Grid>
                <Grid item xs={12} md={9} className="flex items-center justify-center">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        className="w-full codex-button"
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
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        className="w-full codex-button"
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
          <Grid container spacing={0} className="mb-4 text-xs">
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
            <Grid container spacing={0} className="mb-4 text-xs">
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
