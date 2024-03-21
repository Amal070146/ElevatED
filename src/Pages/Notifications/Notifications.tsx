import styles from "./Notifications.module.css";
import { Bell, CourseNew, QuizReminder } from "./svg";
type Props = {};

export const Notifications = (_props: Props) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <h1>Notifications</h1>
        <p>Stay informed with the latest updates.</p>
      </div>
      <div className={styles.Content}>
        <div className={styles.Individual}>
          <div>
            <Bell />
            <div>
              <h3>Class Schedule Update</h3>
              <p>
                An educational session has been added to your class schedule
              </p>
            </div>
          </div>
          <p>2 minutes ago</p>
        </div>{" "}
        <div className={styles.Individual}>
          <div>
            <CourseNew />
            <div>
              <h3>New Course Available</h3>
              <p>
                An educational session has been added to your class schedule
              </p>
            </div>
          </div>
          <p>2 minutes ago</p>
        </div>{" "}
        <div className={styles.Individual}>
          <div>
            <QuizReminder />
            <div>
              <h3>Science Quiz Reminder</h3>
              <p>
                An educational session has been added to your class schedule
              </p>
            </div>
          </div>
          <p>2 minutes ago</p>
        </div>
      </div>
    </div>
  );
};
