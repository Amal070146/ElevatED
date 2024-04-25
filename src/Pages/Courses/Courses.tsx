import styles from "./Courses.module.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

import { FreeMode, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";

type Course = {
  name: string;
  progress: string;
};

const ProgressBar = ({ progress }: { progress: string }) => {
  return (
    <div className={styles.ProgressBar}>
      <div
        className={styles.ProgressBarFill}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export const Courses = () => {
  const [exploreCoursesData, setExploreCoursesData] = useState<
    CourseDisplayType[]
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { data: courses, error } = await supabase.from("courses").select("*");
    if (error) {
      console.log(error);
    } else if (courses) {
      setExploreCoursesData(courses);
    }
  };

  const data: Course[] = [
    {
      name: "DataBase Management System (DBMS)",
      progress: "20",
    },
    {
      name: "Operating System (OS)",
      progress: "30",
    },
    {
      name: "Compiler Design (CD)",
      progress: "10",
    },
    {
      name: "DataBase Management System (DBMS)",
      progress: "70",
    },
    {
      name: "DataBase Management System (DBMS)",
      progress: "100",
    },
    {
      name: "DataBase Management System (DBMS)",
      progress: "50",
    },
  ];

  const navigate = useNavigate();
  return (
    <div className={styles.BaseCourseSelectWrapper}>
      <div className={styles.TopSet}>
        <div>
          <h3>COURSES</h3>
          <h2>
            Amal C Paulson, your{" "}
            <span className="colorText">subjects on going ...!</span>
          </h2>
        </div>
        <div className={styles.courseWrap}>
          {data.map(({ name, progress }) => {
            return (
              <div
                key={name}
                onClick={() => navigate(`/detailcourses/${name}`)}
              >
                <p>{name}</p>
                <div className={styles.Line}></div>
                <ProgressBar progress={progress} />
                <p>{`${progress}%`} Completed</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.BottonSet}>
        <h1>New Courses To Explore </h1>

        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          freeMode={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="CourseSwiper"
        >
          {exploreCoursesData
            .filter((item) => item.modules.length > 0)
            .map((item: CourseDisplayType) => (
              <SwiperSlide>
                <div
                  className={styles.newCourseSwiper}
                  onClick={() => navigate(`/detailcourses/${item.id}`)}
                >
                  <h2>{item.name}</h2>
                </div>
                <h5>{item.modules.length} MODULES</h5>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
