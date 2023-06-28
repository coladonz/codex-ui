import Home from "@/components/Home";
import Section from "@/components/Section";
import CdxLitTabs from "@/components/cdxLit";

export default function Stake() {
  return (
    <Home>
      <Section
        header={<h3 className="text-md">cdxLIT</h3>}
        body={<CdxLitTabs />}
      />
    </Home>
  );
}
