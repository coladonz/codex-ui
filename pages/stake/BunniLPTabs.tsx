import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Link } from "@mui/material";
import { getEtherscanLink } from "@/utils";
import contracts, { bunniGauges } from "@/config/contracts";
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
import BunniLPTabItem from "./BunniLPTabItem";

export default function BunniLPTabs() {
  return (
    <Box>
      {bunniGauges.map((gauge) => {
        return (
          <Box key={gauge.pid} className="mt-2 mb-2">
            <BunniLPTabItem gauge={gauge} />
          </Box>
        );
      })}
    </Box>
  );
}
