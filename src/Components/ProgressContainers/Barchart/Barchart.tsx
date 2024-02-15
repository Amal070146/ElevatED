import { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarGraphProp {
  data: {
    name: string;
    course: number;
  }[];
}


export default class BarCharts extends PureComponent<BarGraphProp> {
  static demoUrl = "https://codesandbox.io/s/bar-chart-has-no-padding-jphoc";

  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
          barSize={30}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
            axisLine={false}
          />
          <Tooltip />

          <Bar dataKey="course" fill="#086B5F" radius={[10, 10, 10, 10]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

