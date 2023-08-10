import { Box, Grid, Table, TableBody } from "@mui/material";
import { bunniGauges } from "@/config/contracts";
import CdxLitStakingClaim from "./CdxLitStakingClaim";
import CdxStakingClaim from "./CdxStakingClaim";
import CdxLockClaim from "./CdxLockClaim";
import BunniPoolClaim from "./BunniPoolClaim";

export default function ClaimPools() {
  return (
    <Box>
      <Grid container>
        <Grid item md={12} lg={12} className="border border-gray-300 text-sm">
          <Table>
            <TableBody>
              <CdxLitStakingClaim />

              <CdxStakingClaim />

              <CdxLockClaim />

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
