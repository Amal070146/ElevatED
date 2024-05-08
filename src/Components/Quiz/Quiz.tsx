import { useEffect, useState } from "react";
import styles from "./Quiz.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router-dom";
import QuizPage from "./components/quizPage";
import Modal from "../modal";

type Props = {};

export const Quiz = (_props: Props) => {
  const [exploreCoursesData, setExploreCoursesData] = useState<
    CourseDisplayType[]
  >([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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

  const getRandomColor = (): string => {
    const colors = [
      "#EBF2FF",
      "#F3E8FF",
      "#E6F6E9",
      "#F5F1E3",
      "#EAF0EA",
      "#F5E3E3",
      "#F7FFF7",
      "#FEFCEA",
      "#E9E8F0",
      "#FEF7E3",
      "#FEECF5",
      "#EAFDFD",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className={styles.quizSecWrapper}>
      <h3>QUIZ</h3>

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
            <SwiperSlide
              className={styles.newNewCourseSwiper}
              style={{ backgroundColor: getRandomColor() }}
              onClick={() => setShowModal(true)}
            >
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
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={"Quiz"}
        type={"success"}
      >
        <QuizPage />
      </Modal>
    </div>
  );
};
