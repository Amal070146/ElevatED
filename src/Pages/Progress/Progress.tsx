import BarCharts from "../../Components/ProgressContainers/Barchart/Barchart";
import styles from "./Progress.module.css";

type Props = {};

export const Progress = (_props: Props) => {
  const DailyTackerdata = [
    {
      name: "M",
      course: 2400,
    },
    {
      name: "T",
      course: 1398,
    },
    {
      name: "W",
      course: 9800,
    },
    {
      name: "Th",
      course: 3908,
    },
    {
      name: "F",
      course: 4800,
    },
    {
      name: "S",
      course: 3800,
    },
    {
      name: "Today",
      course: 4300,
    },
  ];
  return (
    <div className={styles.Wrapper}>
      <div className={styles.DailyTracker}>
        <h2>Daily Tracker</h2>
        <div>
          <h1>15 qts</h1>
          <p>Average questions you do per day</p>
        </div>
        <BarCharts data={DailyTackerdata} />
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
