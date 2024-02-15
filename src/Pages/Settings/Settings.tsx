import  { useState } from "react";
import styles from "./Settings.module.css";

export const Settings = () => {
  const [showFacultyPopup, setShowFacultyPopup] = useState(false);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [eduInstitution, setEduInstitution] = useState("");
  const [institutionDistrict, setInstitutionDistrict] = useState("");
  const [institutionId, setInstitutionId] = useState("");

  const handleFacultyButtonClick = () => {
    setShowFacultyPopup(true);
  };

  const handleAdminButtonClick = () => {
    setShowAdminPopup(true);
  };

  const handleFacultyPopupClose = () => {
    setShowFacultyPopup(false);
  };

  const handleAdminPopupClose = () => {
    setShowAdminPopup(false);
  };

  const handleFacultyPopupSubmit = () => {
    // Perform actions with the collected data
    setShowFacultyPopup(false);
  };

  const handleAdminPopupSubmit = () => {
    // Perform actions with the collected data
    setShowAdminPopup(false);
  };

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
              <button onClick={handleFacultyButtonClick}>Faculty</button>

              <button onClick={handleAdminButtonClick}>Administrator</button>
            </div>
            {showFacultyPopup && (
              <div className={styles.popup}>
                <span
                  className={styles.close}
                  onClick={handleFacultyPopupClose}
                >
                  x
                </span>
                <h2>Faculty Popup</h2>
                <label htmlFor="eduInstitution">Educational Institution:</label>
                <input
                  type="text"
                  id="eduInstitution"
                  value={eduInstitution}
                  onChange={(e) => setEduInstitution(e.target.value)}
                />
                <label htmlFor="institutionDistrict">
                  Institution District:
                </label>
                <input
                  type="text"
                  id="institutionDistrict"
                  value={institutionDistrict}
                  onChange={(e) => setInstitutionDistrict(e.target.value)}
                />
                <button onClick={handleFacultyPopupSubmit}>Submit</button>
              </div>
            )}
            {showAdminPopup && (
              <div className={styles.popup}>
                <span className={styles.close} onClick={handleAdminPopupClose}>
                  &times;
                </span>
                <h2>Administrator Popup</h2>
                <label htmlFor="eduInstitution">Educational Institution:</label>
                <input
                  type="text"
                  id="eduInstitution"
                  value={eduInstitution}
                  onChange={(e) => setEduInstitution(e.target.value)}
                />
                <label htmlFor="institutionDistrict">
                  Institution District:
                </label>
                <input
                  type="text"
                  id="institutionDistrict"
                  value={institutionDistrict}
                  onChange={(e) => setInstitutionDistrict(e.target.value)}
                />
                <label htmlFor="institutionId">Institution ID:</label>
                <input
                  type="text"
                  id="institutionId"
                  value={institutionId}
                  onChange={(e) => setInstitutionId(e.target.value)}
                />
                <button onClick={handleAdminPopupSubmit}>Submit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
