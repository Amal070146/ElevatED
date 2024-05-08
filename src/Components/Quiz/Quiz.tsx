import { useEffect, useState } from "react";
import styles from "./Quiz.module.css";
import { supabase } from "../../utils/supabase";
import QuizPage from "./components/quizPage";
import Modal from "../modal";

export const Quiz = () => {
  const [exploreCoursesData, setExploreCoursesData] = useState<
    CourseDisplayType[]
  >([]);
  const [course, setCourse] = useState<CourseDisplayType>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let { data: courses, error } = await supabase.from("courses").select("*");
    if (error) {
      console.log(error);
    } else if (courses) {
      const Courses: CourseDisplayType[] = courses;
      const filteredCourses = Courses.filter(
        (item) =>
          item &&
          item.modules &&
          item.modules[0] &&
          item.modules[0].mcq &&
          item.modules[0].mcq[0] &&
          item.modules[0].mcq[0].question
      );
      setExploreCoursesData(filteredCourses);
      console.log(filteredCourses);
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
      {exploreCoursesData
        .filter((item) => item.modules.length > 0)
        .map((item: CourseDisplayType) => (
          <div
            className={styles.newNewCourseSwiper}
            style={{ backgroundColor: getRandomColor() }}
            onClick={() => {
              setCourse(item);
              setShowModal(true);
            }}
          >
            <div className={styles.newCourseSwiper}>
              <h2>{item.name}</h2>
            </div>
            <h5>{item.modules.length} MODULES</h5>
          </div>
        ))}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={"Quiz"}
        type={"success"}
      >
        <QuizPage item={course!} />
      </Modal>
    </div>
  );
};
