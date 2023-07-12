const data = [
  {
    ROOT: 0,
    veROOT: 0,
  },
  {
    ROOT: 100,
    veROOT: 50,
  },
  {
    ROOT: 50,
    veROOT: 25,
  },
  {
    ROOT: 200,
    veROOT: 100,
  },
  {
    ROOT: 150,
    veROOT: 75,
  },
  {
    ROOT: 300,
    veROOT: 250,
  },
  {
    ROOT: 250,
    veROOT: 200,
  },
];

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  width: number;
  height: number;
}

const Chart = ({ width, height }: ChartProps) => {
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <LineChart width={width} height={height} data={data}>
      {/* <Tooltip /> */}
      <Line type="monotone" dataKey="ROOT" stroke="#FF2C2C" dot={false} />
      <Line type="monotone" dataKey="veROOT" stroke="#94a3b8" dot={false} />
    </LineChart>
    // </ResponsiveContainer>
  );
};

export default Chart;
