import { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface CircularGraphProps {
  data: {
    name: string;
    value: number;
  }[];
}

export default class CircularGraph extends PureComponent<CircularGraphProps> {

  onPieEnter: CategoricalChartFunc | undefined;

  render() {
    const { data } = this.props;
    return (
      <PieChart width={170} height={170} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={80}
          cy={80}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={8}
          dataKey="value"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}
