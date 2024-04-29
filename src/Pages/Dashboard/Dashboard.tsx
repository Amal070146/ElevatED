import styles from "./Dashboard.module.css";
import imageTop from "../../assets/Dashboard/DashboardTopImg.png";
import quizimage from "../../assets/Dashboard/quizButtonImage.png";
import { OnGoingCourseProgress } from "../../Components/ProgressContainers/OnGoingCourseProgress/OnGoingCourseProgress";
import { Calendar } from "../../Components/Calender/Calender";
import SimpleAreaGraph from "../../Components/ProgressContainers/SimpleAreaChart/SimpleAreaChart";

import { useNavigate } from "react-router-dom";

type Props = {};

export const Dashboard = (_props: Props) => {
  const Progressdata = [
    {
      name: "DBMS",
      percentage: "89",
    },
    {
      name: "Operating System",
      percentage: "78",
    },
    {
      name: "Sustainable Engg",
      percentage: "91",
    },
    {
      name: "Compiler Design",
      percentage: "65",
    },
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

  const recentData = [
    {
      name: "Completed Artificial Intelligence ",
    },
    {
      name: "Completed Quiz ",
    },
    {
      name: "Attended Compiler Design",
    },
    {
      name: "Attended DBMS",
    },
  ];

   const navigate = useNavigate();

   const handleStartQuiz = () => {
     navigate("/quiz"); 
   };
  return (
    <div className={styles.Wrapper}>
      <div className={styles.HeaderSet}>
        <div>
          <h3>DASHBOARD</h3>
          <div>
            <h1>Welcome, </h1>
            <p>Your Journey with elevatEd, an efficient learning</p>
          </div>
        </div>
        <img src={imageTop} alt="" />
      </div>
      <div className={styles.ContentSection}>
        <div className={styles.QuizButtonSet}>
          <h2>
            Start your <span className="colorText">Quiz</span>
          </h2>
          <img src={quizimage} alt="" />
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
        <OnGoingCourseProgress Progressdata={Progressdata} />
        <div className={styles.CalenderWrapper}>
          <Calendar />
        </div>
        <div className={styles.DailyProgress}>
          <div>
            <h2>Daily Progress</h2>
            <p>(or overall progress of correct answers attended) </p>
          </div>
          <SimpleAreaGraph data={Graphdata} />
        </div>
        <div className={styles.RecentActivity}>
          <h2>Recent Activity</h2>
          <div>
            {recentData.map(({ name }) => {
              return <div>{name}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
