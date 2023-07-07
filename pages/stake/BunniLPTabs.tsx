import { Box } from "@mui/material";
import { bunniGauges } from "@/config/contracts";
import BunniLPTabItem from "./BunniLPTabItem";

export default function BunniLPTabs() {
  return (
    <Box>
      {bunniGauges.map((gauge) => {
        return (
          <Box key={gauge.pid} className="mt-3 mb-3">
            <BunniLPTabItem gauge={gauge} />
          </Box>
        );
      })}
    </Box>
  );
}
