import styles from "./Dashboard.module.css";
import imageTop from "../../assets/Dashboard/DashboardTopImg.png";
import quizimage from "../../assets/Dashboard/quizButtonImage.png";
import { OnGoingCourseProgress } from "../../Components/ProgressContainers/OnGoingCourseProgress";

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
  return (
    <div className={styles.Wrapper}>
      <div>
        <h2>Dashboard</h2>
        <div>
          <div>
            <h1>Welcome, Amal C Paulson </h1>
            <p>Your Journey with elevatEd, an efficient learning</p>
          </div>
          <img src={imageTop} alt="" />
        </div>
      </div>
      <div>
        <div>
          <h2>
            Start your <span className="colorText">Quiz</span>
          </h2>
          <img src={quizimage} alt="" />
          <button>Start Quiz</button>
        </div>
        <OnGoingCourseProgress Progressdata={Progressdata} />
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
