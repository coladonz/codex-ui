import Home from "@/components/Home";
import Section from "@/components/Section";
import CdxLitTabs from "./CdxLitTabs";
import BunniLPTabs from "./BunniLPTabs";

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
    </Home>
  );
}
