import Home from "@/components/home";
import Section from "@/components/section";
import CdxLitTabs from "./CdxLitTabs";
import BunniLPTabs from "./BunniLPTabs";
import CdxStakingTabs from "./CdxStakingTabs";

export default function Stake() {
  return (
    <Home>
      <Section
        header={<h3 className="text-md">cdxLIT</h3>}
        body={<CdxLitTabs />}
      />
      <Section
        header={<h3 className="text-md">Stake Bunni LP tokens</h3>}
        body={<BunniLPTabs />}
      />
      <Section
        header={<h3 className="text-md">Stake CDX</h3>}
        body={<CdxStakingTabs />}
      />
    </Home>
  );
}
