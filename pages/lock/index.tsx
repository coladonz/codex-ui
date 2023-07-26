import { Box, Grid } from "@mui/material";
import Home from "@/components/home";
import Section from "@/components/section";
import CdxLockTabs from "./CdxLockTabs";
import CdxLocksView from "./CdxLocksView";
import CodexTabs from "@/components/01-atoms/tabs/Tabs";
import { useState } from "react";

export default function Lock() {
  const [index, setIndex] = useState(0);

  return (
    <Home>
      <div className="m-4">
        <div>
          <div className="flex justify-between mb-6">
            <div>
              <h1 className="font-bold text-2xl">CDX Lock</h1>
              <span className="text-gray-400 text-xs">
                CDX holders can lock their CDX to vote for the gauge weight.
              </span>
            </div>
          </div>
        </div>
        <div style={{ width: "220px" }}>
          <CodexTabs
            index={index}
            setIndex={setIndex}
            items={["Lock CDX", "View Pool Info"]}
          />
        </div>
      </div>
      <Grid container>
        <Grid item md={12} lg={8}>
          {index == 0 && <CdxLockTabs />}
        </Grid>
        <Grid item md={12} lg={4} className="w-[70%]">
          <CdxLocksView />
        </Grid>
      </Grid>
    </Home>
  );
}
