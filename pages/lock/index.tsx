import { Box, Grid } from "@mui/material";
import Home from "@/components/home";
import Section from "@/components/section";
import CdxLockTabs from "./CdxLockTabs";
import CdxLocksView from "./CdxLocksView";

export default function Lock() {
  return (
    <Home>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Section
            header={<h3 className="text-md">CDX</h3>}
            body={<CdxLockTabs />}
          />
        </Grid>
        <Grid item xs={12}>
          <CdxLocksView />
        </Grid>
      </Grid>
    </Home>
  );
}
