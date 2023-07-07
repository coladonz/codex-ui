import { Box, Grid } from "@mui/material";
import Home from "@/components/Home";
import Section from "@/components/Section";
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
