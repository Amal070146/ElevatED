import { Link, useParams } from "react-router-dom";
import styles from "./index.module.css";
import { VideoSvg } from "./svg";
import { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase";
import toast from "react-hot-toast";
import Modal from "../../../../Components/modal";

type User = {
  id: string;
  first_name: string;
  last_name: string;
};

interface UserMap {
  [key: string]: User; // Now using string keys
}
export const DetailCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDisplayType>();
  const [moduleIndex, setModuleIndex] = useState(0);
  const [section, setSection] = useState("video");
  const [users, setUsers] = useState<UserMap>({});
  useEffect(() => {
    featchData();
    fetchUserData();
  }, []);

  const featchData = async () => {
    let { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      toast.error(error.message);
      throw error.message;
    } else if (courses) {
      setCourse(courses);
    }
  };
  const fetchUserData = async () => {
    let { data, error } = await supabase
      .from("users")
      .select("id, first_name, last_name");
    if (data) {
      const usersMap = data.reduce((acc: UserMap, user: User) => {
        acc[user.id] = user; // user.id is a string, matches keys in UserMap
        return acc;
      }, {} as UserMap); // Casting the initial value as UserMap
      setUsers(usersMap);
    }
    if (error) console.error("Fetch users error:", error.message);
  };

  return (
    <div className={styles.Wrapper}>

      <h2>{course?.name}</h2>
      <div className={styles.Header}>
        <div>
          <h4 style={{ color: "grey", display: "flex" }}>
            By&nbsp;
            <h3 style={{ color: "black" }}>
              {course && course.user_id && users[course.user_id]
                ? `${users[course.user_id].first_name} ${users[course.user_id].last_name
                }`
                : "User not found"}
            </h3>
          </h4>
          {/* <p>
            Pre-requisites : <button>MongoDB Query Language</button>{" "}
          </p> */}
        </div>
        <button>Join</button>
      </div>

      <div className={styles.Content}>
        <div className={styles.Header}>
          <button>All</button>
          <p>Created : {course?.created_at}</p>
        </div>
        <div className={styles.ModuleContainer}>
          <div className={styles.ModuleWrapper}>
            {course &&
              course.modules &&
              course.modules.length > 0 &&
              course.modules.map((module, index) => (
                <button key={module.id} onClick={() => setModuleIndex(index)}>
                  <h3>{module.name}</h3>
                  <div className={styles.moduleDescrBox}>
                    <p >Link: {module.yt_link}</p>
                    <p>desc.{module.description}</p>
                  </div>
                </button>
              ))}
          </div>
          <div className={styles.RightPopUpModuleContainer}>
            <div className={styles.Header}>
              <h2> <span style={{ color: "#3F3D56", fontWeight: "600" }} > Module:  </span> {course?.modules[moduleIndex].name}</h2>
              {/* <button>
                <p>Edit</p>
              </button> */}
            </div>
            <div className={styles.Filter}>
              <button className={styles.filterOpt} id={styles.filterVideo}>
                Video
              </button>
              <button
                className={styles.filterOpt}
                id={styles.filterPDF}
                onClick={() => setSection("pdf")}
              >
                PDF
              </button>
              <button
                className={styles.filterOpt}
                id={styles.filterMCQ}
                onClick={() => setSection("mcq")}
              >
                MCQ
              </button>
              <button
                className={styles.filterOpt}
                id={styles.filterlongQA}
                onClick={() => setSection("longqa")}
              >
                Long QA
              </button>
            </div>
            <div className={styles.VideosPDF}>
              <Link
                to={course?.modules[moduleIndex].yt_link!}
                target="_blank"
                rel="noreferrer"
              >
                <VideoSvg />
                <p>Video 1</p>
              </Link>
            </div>
          </div>
          <Modal
            isOpen={section === "pdf"}
            onClose={() => {
              setSection("video");
            }}
            title={"PDF"} 
            type={"success"}
          >
            <div>
              <h3>Text</h3>
              <p>{course?.modules[moduleIndex]?.pdf?.text}</p>
              <h3>Images</h3>
              {course?.modules[moduleIndex]?.pdf?.image_urls.map((image) => (
                <img className={styles.pdfImageSec} src={image} alt="" />
              ))}
            </div>
          </Modal>
          {course?.modules &&
            course?.modules[moduleIndex]?.mcq &&
            course?.modules[moduleIndex]?.mcq.length > 0 && (
              <Modal
                isOpen={section === "mcq"}
                onClose={() => {
                  setSection("video");
                }}
                title={"MCQ"}
                type={"success"}
              >
                <div>
                  {course &&
                    course.modules &&
                    course.modules.length > 0 &&
                    course?.modules[moduleIndex]?.mcq &&
                    course?.modules[moduleIndex]?.mcq.length > 0 &&
                    course?.modules[moduleIndex]?.mcq.map((item, index) => (
                      <div key={index}>
                        <h4>
                          <b>Question :</b>
                          {item.question}
                        </h4>
                        <ul>
                          {item.options.map((option) => (
                            <li>{option}</li>
                          ))}
                        </ul>
                        <p>
                          <b>Correct Answer :</b>
                          {item.correctAnswer}
                        </p>
                      </div>
                    ))}
                </div>
              </Modal>
            )}
          {course?.modules &&
            course?.modules[moduleIndex]?.longQA &&
            course?.modules[moduleIndex]?.longQA.length > 0 && (
              <Modal
                isOpen={section === "longqa"}
                onClose={() => {
                  setSection("video");
                }}
                title={"Long Questions and Answers"}
                type={"success"}
              >
                <div>
                  {course?.modules[moduleIndex]?.longQA.map((item, index) => (
                    <div key={index}>
                      <h4>
                        <b>Question :</b>
                        {item.question}
                      </h4>
                      <p>
                        <b>Answer :</b>
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </Modal>
            )}


        </div>
      </div>
    </div>
  );
};
