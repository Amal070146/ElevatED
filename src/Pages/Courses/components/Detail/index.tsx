import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import { VideoSvg } from "./svg";
import { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase";
import toast from "react-hot-toast";

export const DetailCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseDisplayType>();

  useEffect(() => {
    featchData();
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

  return (
    <div className={styles.Wrapper}>
      <h2>{course?.name}</h2>
      <div className={styles.Header}>
        <div>
          <h3>By {course?.user_id}</h3>
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
              course.modules.map((module) => (
                <button key={module.id}>
                  <h3>{module.name}</h3>
                  <div>
                    <p>{module.yt_link}</p>
                    <p>{module.description}</p>
                  </div>
                </button>
              ))}
          </div>
          <div className={styles.RightPopUpModuleContainer}>
            <div className={styles.Header}>
              <h2>Module 1</h2>
              <button>
                <p>Edit</p>
              </button>
            </div>
            <div className={styles.Filter}>
              <button>All</button>
              <button>Video</button>
              <button>PDF</button>
              <button>Syllabus</button>
            </div>
            <div className={styles.VideosPDF}>
              <button>
                <VideoSvg />
                <p>Video 1</p>
              </button>
              <button>
                {" "}
                <VideoSvg />
                <p>Video 2</p>
              </button>
              <button>
                <VideoSvg />
                <p>Video 3</p>
              </button>
              <button>
                {" "}
                <VideoSvg />
                <p>Video 4</p>
              </button>
            </div>
          </div>

          {/* <div className={styles.RightPopUpMentorDetailsContainer}>
            <h3>Mentor</h3>
            <div className={styles.mentorHeader}>
              <img src="" alt="" />
              <h4>Antony Davis</h4>
            </div>
            <div className={styles.MentorSkills}>
                <button>Teaching</button>
                <button>Front-End</button>
                <button>Back-End</button>
                <button>Web Development</button>
            </div>

          </div> */}
        </div>
      </div>
    </div>
  );
};
