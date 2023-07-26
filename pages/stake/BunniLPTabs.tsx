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
import { bunniGauges } from "@/config/contracts";
import BunniLPTabItem from "./BunniLPTabItem";
import { useState } from "react";
import CdxStakingTabs from "./CdxStakingTabs";

export default function BunniLPTabs() {
  const [selected, setSelected] = useState(-1);

  return (
    <Box>
      <Grid container>
        <Grid item md={12} lg={8} className="border border-gray-300 text-sm">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Token to Stake</TableCell>
                <TableCell>Claimable</TableCell>
                <TableCell>vAPR</TableCell>
                <TableCell>My Deposits</TableCell>
                <TableCell>TVL</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bunniGauges.map((gauge, index) => (
                <TableRow
                  key={gauge.pid}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    background: index === selected ? "#F3EAFF" : undefined,
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
                    $0
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "rgb(156 163 175 / var(--tw-text-opacity))",
                    }}
                  >
                    2.04%
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "rgb(156 163 175 / var(--tw-text-opacity))",
                    }}
                  ></TableCell>
                  <TableCell
                    sx={{
                      color: "rgb(156 163 175 / var(--tw-text-opacity))",
                    }}
                  >
                    $0
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="text"
                      className="codex-button-secondary"
                      onClick={() => setSelected(index)}
                    >
                      {index === selected ? "+ Farming" : "+ Farm"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item md={12} lg={4} className="w-[70%]">
          {selected !== -1 && <BunniLPTabItem gauge={bunniGauges[selected]} />}
          <CdxStakingTabs />
        </Grid>
      </Grid>
    </Box>
  );
}
