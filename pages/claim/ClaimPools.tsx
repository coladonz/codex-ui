import { Box, Grid, Table, TableBody } from "@mui/material";
import { bunniGauges } from "@/config/contracts";
import { BunniPoolClaim } from "./BunniPoolClaim";
import { CdxStakingClaim } from "./CdxStakingClaim";
import { CdxLitStakingClaim } from "./CdxLitStakingClaim";
import { CdxLockClaim } from "./CdxLockClaim";

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
