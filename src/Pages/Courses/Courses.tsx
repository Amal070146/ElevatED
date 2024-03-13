import styles from "./Courses.module.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

import { FreeMode, Pagination } from "swiper/modules";

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
  const NewCourse = [
    {
      name: "Chemistry",
      description: `"Chemical Symphony: Where Molecules Dance and Reactions Speak."`,
      author: "Rahul Dev - Delhi Public School, New Delhi",
      noofmodules: 6,
    },
    {
      name: "Maths",
      description: `"Unlocking the Beauty of Numbers: Where Logic Meets Imagination."`,
      author: "Rahul Dev - Delhi Public School, New Delhi",
      noofmodules: 5,
    },
    {
      name: "Physics",
      description: `"Unraveling the mysteries of the universe through physics."`,
      author: "Hari Krishna - Bishop Cotton School, Shimla",
      noofmodules: 4,
    },
    {
      name: "Geography",
      description: `"Earth's wonders unfold in geography's diverse landscapes."`,
      author: "Kevin John - La Martiniere for Boys, Kolkata",
      noofmodules: 3,
    },
    {
      name: "Chemistry",
      description: `"Chemical Symphony: Where Molecules Dance and Reactions Speak."`,
      author: "Rahul Dev - Delhi Public School, New Delhi",
      noofmodules: 5,
    },
    {
      name: "Maths",
      description: `"Unlocking the Beauty of Numbers: Where Logic Meets Imagination."`,
      author: "Rahul Dev - Delhi Public School, New Delhi",
      noofmodules: 5,
    },
    {
      name: "Physics",
      description: `"Unraveling the mysteries of the universe through physics."`,
      author: "Hari Krishna - Bishop Cotton School, Shimla",
      noofmodules: 5,
    },
    {
      name: "Geography",
      description: `"Earth's wonders unfold in geography's diverse landscapes."`,
      author: "Kevin John - La Martiniere for Boys, Kolkata",
      noofmodules: 5,
    },
  ];
  return (
    <div className={styles.BaseCourseSelectWrapper}>
      <div className={styles.TopSet}>
        <div>
          <h4>COURSES</h4>
          <h2>
            Amal C Paulson, your{" "}
            <span className="colorText">subjects on going ...!</span>
          </h2>
        </div>
        <div className={styles.courseWrap}>
          {data.map(({ name, progress }) => {
            return (
              <div key={name}>
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
          spaceBetween={30}
          freeMode={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="CourseSwiper"
        >
          {NewCourse.map(({ name, description, author, noofmodules }) => {
            return (
              <SwiperSlide>
                <div className={styles.newCourseSwiper}>
                  <h2>{name}</h2> 
                  <h4>{description}</h4>
                  <p>{author}</p>
                </div>
                <h5>{noofmodules} MODULES</h5>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
