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
  colorbase:string,
  colorfront:string,
};

type User = {
  id: string;
  first_name: string;
  last_name: string;
};

interface UserMap {
  [key: string]: User; // Now using string keys
}

const ProgressBar = ({ progress, colorbase, colorfront }: { progress: string , colorbase:string,
colorfront:string }) => {
  return (
    <div className={styles.ProgressBar} style={{backgroundColor:colorbase}}>
      <div
        className={styles.ProgressBarFill}
        style={{ width: `${progress}%`,backgroundColor:colorfront }}
      ></div>
    </div>
  );
};

export const Courses = () => {
  const [exploreCoursesData, setExploreCoursesData] = useState<
    CourseDisplayType[]
  >([]);
  const [users, setUsers] = useState<UserMap>({});
  useEffect(() => {
    fetchData();
    fetchUserData();
  }, []);

  const fetchData = async () => {
    let { data: courses, error } = await supabase.from("courses").select("*");
    if (error) {
      console.log(error);
    } else if (courses) {
      setExploreCoursesData(courses);
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

  const data: Course[] = [
    {
      name: "DataBase Management System (DBMS)",
      progress: "20",
      colorbase:"	#F08080",
      colorfront:"red",
    },
    {
      name: "Operating System (OS)",
      progress: "30",
      colorbase:"#000",
      colorfront:"#fff000",
    },
    {
      name: "Compiler Design (CD)",
      progress: "10",
      colorbase:"#000",
      colorfront:"#fff000",
    },
    {
      name: "DataBase Management System (DBMS)",
      progress: "70",
      colorbase:"#000",
      colorfront:"#fff000",
    },
    {
      name: "DataBase Management System (DBMS)",
      progress: "100",
      colorbase:"#000",
      colorfront:"#fff000",
    },
    {
      name: "DataBase Management System (DBMS)",
      progress: "50",
      colorbase:"#000",
      colorfront:"#fff000",
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
          {data.map(({ name, progress,colorbase,colorfront }) => {
            return (
              <div
                key={name}
                onClick={() => navigate(`/detailcourses/${name}`)}
              >
                <p>{name}</p>
                <div className={styles.Line}></div>
                <ProgressBar progress={progress}  colorbase={colorbase} colorfront={colorfront}/>
                <p>{`${progress}%`} Completed</p>
              </div>
            );
          })}
        </div>
      </div>
      <div></div>
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
                <h3>
                  {users[item.user_id]
                    ? `${users[item.user_id].first_name} ${
                        users[item.user_id].last_name
                      }`
                    : "User not found"}
                </h3>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
