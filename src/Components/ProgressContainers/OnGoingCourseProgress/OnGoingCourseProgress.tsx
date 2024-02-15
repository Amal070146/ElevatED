import styles from "./ProgressBar.module.css";
import { HiDotsHorizontal } from "react-icons/hi";

interface CourseProgress {
  name: string;
  percentage: string;
}

interface Props {
  Progressdata: CourseProgress[];
}


export const OnGoingCourseProgress = (_props: Props) => {
  return (
    <div className={styles.OnGoingCourses}>
      <div className={styles.Header}>
        <h2>Ongoing Courses</h2>
        <button>
          <HiDotsHorizontal />
        </button>
      </div>
      <div className={styles.ProgressData}>
        {_props.Progressdata.map(({ name, percentage }) => {
          return (
            <div className={styles.ProgressBar}>
              <div
                className={styles.ProgressBarFill}
                style={{ width: `${percentage}%` }}
              >
                <p>
                  {name}&nbsp;{percentage}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
