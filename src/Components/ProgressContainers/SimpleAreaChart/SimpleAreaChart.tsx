import { PureComponent } from "react";
import {
  XAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";



interface SimpleAreaGraphProps {
  data: {
    name: string;
    uv: number;
    pv: number;
    amt: number;
  }[];
}

export default class SimpleAreaGraph extends PureComponent<SimpleAreaGraphProps> {
  static demoUrl = "https://codesandbox.io/s/synchronized-line-charts-zc3nl";

  render() {
    const { data } = this.props;
    return (
      <div style={{ width: "100%" }}>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
       
            <XAxis dataKey="name" />
          
            <Tooltip />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
