import styles from "./Settings.module.css";

type Props = {};

export const Settings = (_props: Props) => {
  return (
    <div className={styles.Wrapper}>
      <h2>Account</h2>
      <div className={styles.BottonConatiner}>
        <div className={styles.LeftContainer}>
          <div>
            <h2>Entry your details </h2>
            <p>Let’s setup an account for ypu !</p>
          </div>
          <div className={styles.InputWrapper}>
            <div>
              <label htmlFor="name">First Name : </label>
              <input type="text" placeholder="eg:Harry" />
            </div>
            <div>
              <label htmlFor="name">Last Name : </label>
              <input type="text" placeholder="eg:Willson" />
            </div>
            <div>
              <label htmlFor="email">Email : </label>
              <input type="email" placeholder="eg:Harry@gmail.com" />
            </div>
            <div>
              <label htmlFor="phone">Phone Number : </label>
              <input type="text" placeholder="eg:9856754236" />
            </div>
            <div>
              <label htmlFor="district">District : </label>
              <input type="text" placeholder="eg:Thrissur" />
            </div>
            <div>
              <label htmlFor="degree">Degree Type : </label>
              <input type="text" placeholder="eg:B.Tech" />
            </div>
            <div>
              <label htmlFor="fieldofstudy">Field of Study : </label>
              <input type="text" placeholder="eg:CSE" />
            </div>
            <div>
              <label htmlFor="college">Educational Institution : </label>
              <input
                type="text"
                placeholder="eg:Christ College of Engineering"
              />
              <div className={styles.checkboxcontainer}>
                <input type="checkbox" />
                <p>I’m currently studying here</p>
              </div>
            </div>

            <div>
              <label htmlFor="yearofgraduation">Year of Graduation : </label>
              <input type="number" placeholder="eg:2024" />
            </div>
          </div>
          <div className={styles.checkboxcontainer}>
            <input type="checkbox" />
            <p>Want to receive mail about text and other directions.</p>
          </div>
          <button>Submit</button>
        </div>
        <div className={styles.RightContainer}>
          <div className={styles.innerWrapper}>
            <h2>Request as</h2>
            <div>
              <button>Faculty</button>
              <button>Administrator</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
