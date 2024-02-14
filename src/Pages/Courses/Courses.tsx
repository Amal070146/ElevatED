
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
        <div>
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
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
