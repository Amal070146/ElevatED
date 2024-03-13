import BarCharts from "../../Components/ProgressContainers/Barchart/Barchart";
import CircularGraph from "../../Components/ProgressContainers/CircularGraph/CircularGraph";
import SimpleAreaGraph from "../../Components/ProgressContainers/SimpleAreaChart/SimpleAreaChart";
import progresspageImg from "../../assets/progressPage/progressPgImg.png" 
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

  const Subjectdata = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const Graphdata = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className={styles.Wrapper}>
      
      <div className={styles.WrapperWrapper}>
      <div className={styles.DailyTracker}>
        <h2>Daily Tracker</h2>
        <div>
          <h1>15 qts</h1>
          <p>Average questions you do per day</p>
        </div>
        <BarCharts data={DailyTackerdata} />
      </div>
 
    
      <div className={styles.pie}>
        <div className={styles.inner_pie}>
          <h2>Subject-wise Tracker</h2>
          <div>
            <p>Subject knowledge can be analysed </p> <br />
            <button>Week</button>
          </div>
          <CircularGraph data={Subjectdata} />
        </div>
      </div>

      <div className={styles.DailyProgress}>
        <div>
          <h2>Daily Progress</h2>
          <p>(or overall progress of correct answers attended) </p>
        </div>
        <SimpleAreaGraph data={Graphdata} />
      </div> 
      </div>
      <div >
        <img className={styles.progresspageImg} src={progresspageImg} alt="" />
      </div>

    </div>
  );
};
