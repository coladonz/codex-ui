import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import contracts, { GaugeInfo, bunniGauges } from "@/config/contracts";
import Image from "next/image";
import { BaseRewardPool } from "@/abis";
import { Address } from "viem";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import WaitingModal from "@/components/waiting-modal/WaitingModal";

export function BunniPoolClaim({ gauge }: { gauge: GaugeInfo }) {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [isActive, setIsActive] = useState(false);
  const { data: claimable, refetch: reloadClaimable } = useContractRead({
    address: gauge.oLITRewards as Address,
    abi: BaseRewardPool,
    functionName: "earned",
    args: [address],
  });
  const { writeAsync: claim, status: claimStatus } = useContractWrite({
    address: gauge.oLITRewards as Address,
    abi: BaseRewardPool,
    functionName: "getReward",
    args: [],
    chainId: chain?.id,
  });

  useEffect(() => {
    if (claimStatus == "success") {
      reloadClaimable();
      setIsActive(false);
    }
    if (claimStatus == "loading") {
      setIsActive(true);
    }
  }, [claimStatus, reloadClaimable]);

  return (
    <>
      <WaitingModal isActive={isActive} setIsActive={setIsActive} />
      <TableRow
        key={gauge.pid}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell
          component="th"
          scope="row"
          sx={{
            color: "rgb(156 163 175 / var(--tw-text-opacity))",
          }}
        >
          {gauge.name}
        </TableCell>
        <TableCell
          sx={{
            color: "rgb(156 163 175 / var(--tw-text-opacity))",
          }}
        >
          <div>
            <div>Amount Claimable</div>
            <div className="text-lg text-black font-bold">
              {Number(
                ethers.utils.formatEther((claimable as any) || 0)
              ).toFixed(4)}{" "}
              oLIT
            </div>
          </div>
        </TableCell>
        <TableCell
          sx={{
            color: "rgb(156 163 175 / var(--tw-text-opacity))",
          }}
        >
          <div>
            <div>Average vAPR</div>
            <div className="text-lg text-black font-bold">- %</div>
          </div>
        </TableCell>
        <TableCell align="right">
          <Button variant="text" className="codex-button" onClick={() => claim()}>
            <Image src="/icons/claim.svg" width={20} height={20} alt="claim" />
            Claim
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ClaimPools() {
  return (
    <Box>
      <Grid container>
        <Grid item md={12} lg={12} className="border border-gray-300 text-sm">
          <Table>
            <TableBody>
              <TableRow
                key="Staked cdxLIT"
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  Staked cdxLIT
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Amount Claimable</div>
                    <div className="text-lg text-black font-bold">$ -</div>
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Average vAPR</div>
                    <div className="text-lg text-black font-bold">- %</div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    className="codex-button"
                    onClick={() => {}}
                  >
                    <Image
                      src="/icons/claim.svg"
                      width={20}
                      height={20}
                      alt="claim"
                    />
                    Claim
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow
                key="Staked CDX"
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  Staked CDX
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Amount Claimable</div>
                    <div className="text-lg text-black font-bold">$ -</div>
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Average vAPR</div>
                    <div className="text-lg text-black font-bold">- %</div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    className="codex-button"
                    onClick={() => {}}
                  >
                    <Image
                      src="/icons/claim.svg"
                      width={20}
                      height={20}
                      alt="claim"
                    />
                    Claim
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow
                key="Locked CDX"
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  Locked CDX
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Amount Claimable</div>
                    <div className="text-lg text-black font-bold">$ -</div>
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    color: "rgb(156 163 175 / var(--tw-text-opacity))",
                  }}
                >
                  <div>
                    <div>Average vAPR</div>
                    <div className="text-lg text-black font-bold">- %</div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    className="codex-button"
                    onClick={() => {}}
                  >
                    <Image
                      src="/icons/claim.svg"
                      width={20}
                      height={20}
                      alt="claim"
                    />
                    Claim
                  </Button>
                </TableCell>
              </TableRow>

              {bunniGauges.map((gauge, index) => (
                <BunniPoolClaim key={index} gauge={gauge} />
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
}
